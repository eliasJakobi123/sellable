export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="mb-4">
              <img
                src="/sellablelogo.png"
                alt="Sellable"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Turn your ideas into sellable digital products in under 2 minutes.
            </p>
          </div>

          {/* For Section */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              For
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/starting-business" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Starting Business
                </a>
              </li>
              <li>
                <a href="/creators" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Creators
                </a>
              </li>
              <li>
                <a href="/professionals" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Professionals
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/pricing" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Imprint
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex justify-center items-center">
            <p className="text-gray-500 text-sm">
              © 2024 Sellable. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
