import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">HealthyAI</h3>
            <p className="text-gray-600 text-sm">
              Your personal AI-powered nutrition and recipe assistant.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-gray-600 hover:text-orange-500 text-sm">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-gray-600 hover:text-orange-500 text-sm">
                  Generate Recipes
                </Link>
              </li>
              <li>
                <Link href="/meal-plan" className="text-gray-600 hover:text-orange-500 text-sm">
                  Meal Plan
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-orange-500 text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-orange-500 text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-orange-500 text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-orange-500 text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-orange-500 text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-600 hover:text-orange-500 text-sm">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} HealthyAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 