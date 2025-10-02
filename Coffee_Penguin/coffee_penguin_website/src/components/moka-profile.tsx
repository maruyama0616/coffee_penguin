export function MokaProfile() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="order-2 lg:order-1">
        <div className="relative">
          <div className="aspect-square bg-gradient-to-br from-amber-200 to-orange-300 rounded-2xl shadow-2xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-6xl">??</span>
                </div>
                <p className="text-gray-600 font-medium">モカのプロフィール写真</p>
                <p className="text-sm text-gray-500">（実際の写真に差し替え予定）</p>
              </div>
            </div>
          </div>

          <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/80 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl">☕</span>
          </div>
          <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-xl">❄️</span>
          </div>
        </div>
      </div>

      <div className="order-1 lg:order-2">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">モカのプロフィール</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">名前</h3>
            <p className="text-gray-600">モカ（Mocha）</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">年齢</h3>
            <p className="text-gray-600">（推定20歳前後）</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">好きなこと</h3>
            <p className="text-gray-600">朝のコーヒー、街歩き、イラスト、読書</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">性格</h3>
            <p className="text-gray-600">人なつっこくて、コーヒー談義を始めると止まらないタイプ</p>
          </div>
        </div>
      </div>
    </div>
  )
}
