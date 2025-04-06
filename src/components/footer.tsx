import Link from "next/link"

export default function Footer() {
  return (
    // <footer className="border-t bg-white">
    //   <div className="container mx-auto px-4 py-8">
    //     <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
    //       <div>
    //         <h3 className="font-bold text-lg mb-4">HealthyAI</h3>
    //         <p className="text-gray-600 text-sm">
    //           Your personal AI-powered nutrition and recipe assistant.
    //         </p>
    //       </div>
    //       <div>
    //         <h4 className="font-semibold mb-4">Quick Links</h4>
    //         <ul className="space-y-2">
    //           <li>
    //             <Link href="/dashboard" className="text-gray-600 hover:text-orange-500 text-sm">
    //               Dashboard
    //             </Link>
    //           </li>
    //           <li>
    //             <Link href="/chat" className="text-gray-600 hover:text-orange-500 text-sm">
    //               Generate Recipes
    //             </Link>
    //           </li>
    //           <li>
    //             <Link href="/meal-plan" className="text-gray-600 hover:text-orange-500 text-sm">
    //               Meal Plan
    //             </Link>
    //           </li>
    //         </ul>
    //       </div>
    //       <div>
    //         <h4 className="font-semibold mb-4">Resources</h4>
    //         <ul className="space-y-2">
    //           <li>
    //             <Link href="/blog" className="text-gray-600 hover:text-orange-500 text-sm">
    //               Blog
    //             </Link>
    //           </li>
    //           <li>
    //             <Link href="/faq" className="text-gray-600 hover:text-orange-500 text-sm">
    //               FAQ
    //             </Link>
    //           </li>
    //           <li>
    //             <Link href="/contact" className="text-gray-600 hover:text-orange-500 text-sm">
    //               Contact
    //             </Link>
    //           </li>
    //         </ul>
    //       </div>
    //       <div>
    //         <h4 className="font-semibold mb-4">Legal</h4>
    //         <ul className="space-y-2">
    //           <li>
    //             <Link href="/privacy" className="text-gray-600 hover:text-orange-500 text-sm">
    //               Privacy Policy
    //             </Link>
    //           </li>
    //           <li>
    //             <Link href="/terms" className="text-gray-600 hover:text-orange-500 text-sm">
    //               Terms of Service
    //             </Link>
    //           </li>
    //           <li>
    //             <Link href="/cookies" className="text-gray-600 hover:text-orange-500 text-sm">
    //               Cookie Policy
    //             </Link>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //     <div className="mt-8 pt-8 border-t text-center text-gray-600 text-sm">
    //       <p>&copy; {new Date().getFullYear()} HealthyAI. All rights reserved.</p>
    //     </div>
    //   </div>
    // </footer>
    <div id="s4snpw"><footer className="py-16 code-section hovered-element" id="s4snpw">
      <div className="container mx-auto px-4 text-center">
        <div className="m-8 text-xl font-bold">
          <Link href="/" className="text-3xl text-[var(--primary-color)] [font-family:var(--font-family-heading)]">
            <span>Yumm</span>
            <span className="text-[var(--dark-text-color)]">&amp;Healthy</span>
          </Link>
        </div>
        <div className="mb-8 flex flex-col justify-center sm:flex-row">
          <a href="/" className="mx-8 text-lg text-[var(--gray-text-color)] hover:text-[var(--primary-color)]">Home</a>

          <a href="/how-it-works" className="mx-8 text-lg text-[var(--gray-text-color)] hover:text-[var(--primary-color)]">How It Works</a>
          <a href="/pricing" className="mx-8 text-lg text-[var(--gray-text-color)] hover:text-[var(--primary-color)]">Pricing</a>

          <a href="/contact-us" className="mx-8 text-lg text-[var(--gray-text-color)] hover:text-[var(--primary-color)]">Contact Us</a>
          <a href="/faq" className="mx-8 text-lg text-[var(--gray-text-color)] hover:text-[var(--primary-color)]">FAQ</a>
        </div>
        <div className="mb-4"><a href="/" className="mx-2 text-[var(--gray-text-color)] hover:text-[var(--primary-color)]"><i className="fa-brands fa-facebook-f" aria-hidden="true"></i></a><a href="/" className="mx-2 text-[var(--gray-text-color)] hover:text-[var(--primary-color)]"><i className="fa-brands fa-x-twitter" aria-hidden="true"></i></a><a href="/" className="mx-2 text-[var(--gray-text-color)] hover:text-[var(--primary-color)]"><i className="fa-brands fa-linkedin-in" aria-hidden="true"></i></a></div>
        <p className="text-lg text-[var(--gray-text-color)]">© 2025 Yumm&amp;Healthy All Rights Reserved</p>
      </div>
    </footer></div>
  )
} 