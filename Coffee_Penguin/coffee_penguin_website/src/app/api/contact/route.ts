import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { Contact } from '@prisma/client'

const DEFAULT_CONTACT_RECIPIENT = 'coffeepenguin@maruyama.net'
const CONTACT_RECIPIENT = process.env.CONTACT_TO_EMAIL || DEFAULT_CONTACT_RECIPIENT
const CONTACT_FROM = process.env.CONTACT_FROM_EMAIL || 'Coffee Penguin <no-reply@coffee-penguin.com>'
const RESEND_API_ENDPOINT = 'https://api.resend.com/emails'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // 必須項目の検証
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // データベースに保存
    const contact = await prisma.contact.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
        status: 'new',
      },
    })

    await sendNotificationEmail(contact)

    return NextResponse.json({
      message: 'Contact form submitted successfully',
      id: contact.id,
    })
  } catch (error) {
    console.error('Failed to submit contact form:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    )
  }
}

// 管理者向けのお問い合わせ一覧取得API
export async function GET(request: NextRequest) {
  try {
    // TODO: 管理者認証を追加

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const perPage = parseInt(searchParams.get('per_page') || '20')
    const status = searchParams.get('status')

    const where = status ? { status } : {}

    const contacts = await prisma.contact.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * perPage,
      take: perPage,
    })

    const total = await prisma.contact.count({ where })

    return NextResponse.json({
      contacts,
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage),
    })
  } catch (error) {
    console.error('Failed to fetch contacts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    )
  }
}

async function sendNotificationEmail(contact: Contact) {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.warn('RESEND_API_KEY is not set; skipping contact notification email')
    return
  }

  try {
    const response = await fetch(RESEND_API_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: [CONTACT_RECIPIENT],
        subject: `[Coffee Penguin] 新しいお問い合わせ: ${contact.subject}`,
        text: buildEmailText(contact),
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Failed to send contact notification email:', errorText)
    }
  } catch (error) {
    console.error('Error while sending contact notification email:', error)
  }
}

function buildEmailText(contact: Contact) {
  return `新しいお問い合わせが届きました。

お名前: ${contact.name}
メールアドレス: ${contact.email}
件名: ${contact.subject}

メッセージ:
${contact.message}

---
このメールはCoffee PenguinのWebサイトから自動送信されています。`
}
