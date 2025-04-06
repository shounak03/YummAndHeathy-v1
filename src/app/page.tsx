import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarChart2, Calendar, Heart, ShoppingCart, Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <main className="flex flex-col items-center">

      <section className="bg-gradient-to-b from-[#ffffff] to-[var(--light-background-color)] lg:py-2 code-section">
        <div className="container mx-auto mb-24 px-6">
          <div className="flex flex-col-reverse items-center lg:flex-row">
            <div className="mt-12 w-full lg:mt-32 lg:w-[45%] lg:pr-14">
              <h1 className="mb-4 text-center text-4xl font-bold [font-family:var(--font-family-heading)] lg:text-left lg:text-5xl xl:text-6xl">
                Transform Your Cooking Experience with Yumm&Healthy
              </h1>
              <p className="mb-12 text-center text-xl text-[var(--dark-text-color)] lg:text-left">
                Unlock ingredient-based recipe generation that adapts to what you have, ensuring no food goes to waste.
                Create nutritious meals effortlessly with our AI-driven assistant.
              </p>
              <div className="mb-12 flex items-center justify-center lg:items-start lg:justify-start">
                <Link
                  href="/chat"
                  className="items-center rounded bg-[var(--primary-button-bg-color)] px-[var(--button-padding-x)] py-[var(--button-padding-y)] text-lg font-semibold text-[var(--primary-button-text-color)] hover:bg-[var(--primary-button-hover-bg-color)] hover:text-[var(--primary-button-hover-text-color)]"
                >
                  Get Started
                </Link>
              </div>


            </div>

            <div className="flex justify-center items-center w-full h-full lg:w-[55%] lg:pl-6">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/woman-thinking-about-week-meal-plan-11433220-9251689.png"
                alt="Hero"
                className="mt-8 max-h-[200px] lg:max-h-[500px] h-auto w-auto object-contain lg:mt-0"
              />
            </div>
          </div>
        </div>
      </section>


      <div id="features">
        <section className="code-section clicked-element clicked-code-section hovered-element" >
          <div className="container mx-auto px-6 py-6 md:py-12">
            <div className="rounded-3xl bg-[var(--light-background-color)] px-4 py-8 md:py-40">
              <h2 className="mx-auto mb-4 max-w-4xl text-center text-3xl font-bold [font-family:var(--font-family-heading)] md:text-6xl">
                Transform Your Cooking with Yumm&amp;Healthy
              </h2>
              <p className="mb-8 text-center text-xl text-[var(--dark-text-color)]">
                Unlock the potential of your pantry with our AI-driven recipe generator, designed for effortless cooking and mindful nutrition.
              </p>
            </div>

            <div className="-mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 px-4 lg:-mt-36 lg:grid lg:flex-none lg:grid-cols-3 lg:place-items-center lg:items-stretch lg:gap-y-12">
              {[1, 2, 3].map((step) => (
                <div key={step} className="max-w-sm flex-1 rounded-3xl bg-[#ffffff] p-14 text-center shadow-xl shadow-[#ccc]">
                  <div className="mx-auto mb-4 mt-2 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--light-background-color)] text-4xl">
                    <span className="text-[var(--primary-color)]">{step}</span>
                  </div>
                  <h4 className="mb-6 text-3xl font-semibold">
                    {step === 1 && 'Ingredient-Based Recipes'}
                    {step === 2 && 'Nutritional Breakdown'}
                    {step === 3 && 'Personalized Meal Plans'}
                  </h4>
                  <p className="text-[var(--dark-text-color)]">
                    {step === 1 && 'Simply input what you have, and generate delicious recipes that minimize food waste while maximizing flavor.'}
                    {step === 2 && "Understand your meal's nutritional profile including calories, macros, and micros for informed dietary choices."}
                    {step === 3 && 'Craft meal plans tailored to your dietary preferences, including keto and vegan options, with easy grocery lists.'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>



      <section className="py-20 code-section" id="working">
        <div className="container mx-auto px-6">
          <h2 className="mb-6 text-center text-6xl font-bold [font-family:var(--font-family-heading)]">
            How Yumm&Healthy Works
          </h2>
          <h3 className="mb-12 text-center text-xl text-[var(--gray-text-color)]">
            Revolutionize your cooking experience with Yumm&Healthy
          </h3>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Ingredient-Based Generation",
                desc: "Input your available ingredients and let our AI create delicious and unique recipes tailored to you.",
              },
              {
                title: "Nutritional Insights",
                desc: "Get comprehensive nutritional breakdowns, including calories, macros, and micros for each recipe.",
              },
              {
                title: "Personalized Meal Plans",
                desc: "Create customized meal plans tailored to your dietary preferences, including keto or vegan options.",
              },
              {
                title: "Streamlined Grocery Lists",
                desc: "Automatically generate grocery lists that make shopping easy and ensure you have everything you need.",
              },
            ].map(({ title, desc }, i) => (
              <div key={i} className="flex-1 rounded-3xl bg-[#ffffff] p-8 text-center shadow-lg shadow-[#ccc] md:max-w-xs md:p-12">
                <div className="mx-auto mb-12 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--light-background-color)] text-4xl">
                  <span className="text-[var(--primary-color)]">{i + 1}</span>
                </div>
                <h4 className="mb-2 text-2xl font-semibold">{title}</h4>
                <p className="text-[var(--gray-text-color)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="mt-12 bg-[var(--light-background-color)] py-12 code-section">
        <div className="container mx-auto flex flex-col sm:flex-row">
          <div className="mb-6 flex w-full flex-col items-center md:mb-0 md:w-[55%] md:flex-row">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/meal-planning-7981666-6405337.png"
              alt="CTA"
              className="h-auto w-full"
            />
          </div>
          <div className="flex w-full flex-col justify-center p-8 md:w-[45%] md:pr-14">
            <h3 className="mb-2 text-center text-3xl font-bold [font-family:var(--font-family-heading)] sm:text-left sm:text-6xl">
              Transform Your Cooking with Yumm&amp;Healthy
            </h3>
            <p className="mb-12 text-center text-lg text-[var(--gray-text-color)] sm:text-left sm:text-xl">
              Create unique recipes based on what you have in your kitchen, while receiving a detailed nutritional breakdown including calories, macros, and micros. Enjoy personalized meal plans that cater to your dietary needs, whether you're keto, vegan, or anything in between.
            </p>
            <div className="mb-12 flex items-center justify-center md:items-start md:justify-start">
              <a
                href="/features"
                className="items-center rounded bg-[var(--primary-button-bg-color)] px-[var(--button-padding-x)] py-[var(--button-padding-y)] text-lg font-semibold text-[var(--primary-button-text-color)] hover:bg-[var(--primary-button-hover-bg-color)] hover:text-[var(--primary-button-hover-text-color)]"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>





      <div id="plans">
        <section className="code-section clicked-code-section hovered-element" id="szxsjjg">
          <div className="container mx-auto px-6 py-12 clicked-element" >
            <h2 className="mb-4 text-center text-3xl font-bold [font-family:var(--font-family-heading)] sm:px-40 sm:text-6xl">
              Choose the Perfect Plan for Your Culinary Journey
            </h2>
            <p className="text-center text-xl text-[var(--gray-text-color)] sm:mb-16">
              Join thousands of food enthusiasts transforming their cooking experience with us!
            </p>
            <div className="flex flex-col lg:flex-row">
              {/* Basic Plan */}
              <div className="my-6 flex-1 rounded-3xl bg-[#ffffff] px-4 py-12 text-center shadow-lg shadow-[#ccc] sm:mx-6 sm:px-10">
                <h4 className="mb-4 text-4xl font-semibold">Basic</h4>
                <p className="mb-8 font-light text-[var(--dark-text-color)] xl:text-xl">
                  Start your journey for just $0.00 today with a 14-day free trial. Easily cancel anytime.
                </p>
                <p className="mb-2 text-6xl font-bold text-[var(--primary-color)]">$0</p>
                <p className="mb-9 text-lg font-light uppercase text-[var(--dark-text-color)]">14 Day Free Trial</p>
                <a href="/pricing" className="mx-auto mb-11 block w-2/3 rounded border border-[var(--dark-border-color)] bg-[#ffffff] py-4 font-semibold uppercase text-[var(--dark-text-color)]">Select This Plan</a>
                <ul className="space-y-3 font-light">
                  <li className="flex min-h-[28px] items-center">
                    <i className="fa-regular fa-circle-check fa-xl ml-1 mr-4 text-[var(--primary-color)]" aria-hidden="true"></i>
                    <span className="text-left text-lg text-[var(--dark-text-color)]">Ingredient-Based Recipe Generation</span>
                  </li>
                  <li className="flex min-h-[28px] items-center">
                    <i className="fa-regular fa-circle-check fa-xl ml-1 mr-4 text-[var(--primary-color)]" aria-hidden="true"></i>
                    <span className="text-left text-lg text-[var(--dark-text-color)]">Nutritional Breakdown of Meals</span>
                  </li>
                  <li className="flex min-h-[28px] items-center">
                    <i className="fa-regular fa-circle-check fa-xl ml-1 mr-4 text-[var(--primary-color)]" aria-hidden="true"></i>
                    <span className="text-left text-lg text-[var(--dark-text-color)]">Custom Grocery Lists</span>
                  </li>
                  <li className="flex min-h-[28px] items-center">
                    <i className="fa-regular fa-circle-check fa-xl ml-1 mr-4 text-[var(--primary-color)]" aria-hidden="true"></i>
                    <span className="text-left text-lg text-[var(--dark-text-color)]">Dietary Guideline Integration (Keto, Vegan)</span>
                  </li>
                </ul>
              </div>

              {/* Premium Plan */}
              <div className="relative my-6 flex-1 rounded-3xl bg-[var(--primary-color)] px-4 py-12 text-center text-white shadow-lg shadow-[#ccc] sm:mx-6 sm:px-10">
                <div className="absolute -top-6 left-1/4 mb-2 flex h-[54px] w-1/2 items-center justify-center rounded bg-black px-2 py-1 text-center text-xl font-semibold uppercase">
                  Most Popular
                </div>
                <h4 className="mb-4 text-4xl font-semibold">Premium</h4>
                <p className="mb-8 font-light xl:text-xl">Elevate your cooking with a 14-Day Free Trial. Experience more benefits tailored for you!</p>
                <p className="mb-3 text-6xl font-bold">$10</p>
                <p className="mb-9 text-lg font-light uppercase">Monthly Subscription</p>
                <a href="/pricing" className="mx-auto mb-11 block w-2/3 rounded bg-white py-4 font-semibold uppercase text-[var(--dark-text-color)]">Select This Plan</a>
                <ul className="space-y-3 font-light text-white">
                  <li className="flex min-h-[28px] items-center">
                    <i className="fa-regular fa-circle-check fa-xl ml-1 mr-4" aria-hidden="true"></i>
                    <span className="text-left text-lg">Access to Exclusive Recipes</span>
                  </li>
                  <li className="flex min-h-[28px] items-center">
                    <i className="fa-regular fa-circle-check fa-xl ml-1 mr-4" aria-hidden="true"></i>
                    <span className="text-left text-lg">Customized Meal Plans</span>
                  </li>
                  <li className="flex min-h-[28px] items-center">
                    <i className="fa-regular fa-circle-check fa-xl ml-1 mr-4" aria-hidden="true"></i>
                    <span className="text-left text-lg">Advanced Nutritional Tracking</span>
                  </li>
                  <li className="flex min-h-[28px] items-center">
                    <i className="fa-regular fa-circle-check fa-xl ml-1 mr-4" aria-hidden="true"></i>
                    <span className="text-left text-lg">Priority Support</span>
                  </li>
                </ul>
              </div>

              {/* Enterprise Plan */}
              <div className="my-6 flex-1 rounded-3xl bg-[#ffffff] px-4 py-12 text-center shadow-lg shadow-[#ccc] sm:mx-6 sm:px-10">
                <h4 className="mb-4 text-4xl font-semibold">Enterprise</h4>
                <p className="mb-8 font-light text-[var(--dark-text-color)] xl:text-xl">
                  Unlock the full potential of Yumm&amp;Healthy with unlimited access and benefits starting with a 14-day free trial.
                </p>
                <p className="mb-3 text-6xl font-bold text-[var(--primary-color)]">$49</p>
                <p className="mb-9 text-lg font-light uppercase text-[var(--dark-text-color)]">14 Day Free Trial</p>
                <a href="/pricing" className="mx-auto mb-11 block w-2/3 rounded border border-[var(--dark-border-color)] bg-[#ffffff] py-4 font-semibold uppercase text-[var(--dark-text-color)]">Select This Plan</a>
                <ul className="space-y-3 font-light">
                  <li className="flex min-h-[28px] items-center">
                    <i className="fa-regular fa-circle-check fa-xl ml-1 mr-4 text-[var(--primary-color)]" aria-hidden="true"></i>
                    <span className="text-left text-lg text-[var(--dark-text-color)]">Unlimited Users</span>
                  </li>
                  <li className="flex min-h-[28px] items-center">
                    <i className="fa-regular fa-circle-check fa-xl ml-1 mr-4 text-[var(--primary-color)]" aria-hidden="true"></i>
                    <span className="text-left text-lg text-[var(--dark-text-color)]">Comprehensive Meal Planning</span>
                  </li>
                  <li className="flex min-h-[28px] items-center">
                    <i className="fa-regular fa-circle-check fa-xl ml-1 mr-4 text-[var(--primary-color)]" aria-hidden="true"></i>
                    <span className="text-left text-lg text-[var(--dark-text-color)]">All Advanced Features</span>
                  </li>
                  <li className="flex min-h-[28px] items-center">
                    <i className="fa-regular fa-circle-check fa-xl ml-1 mr-4 text-[var(--primary-color)]" aria-hidden="true"></i>
                    <span className="text-left text-lg text-[var(--dark-text-color)]">Dedicated Account Management</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer/>
    </main>
  );
}
