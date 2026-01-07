export default function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Try Sellable with basic features",
      features: ["1 product creation", "Basic templates", "PDF export only"],
      buttonText: "Get Started",
      popular: false
    },
    {
      name: "Starter",
      price: "$9",
      description: "Perfect for getting started",
      features: ["10 product creations", "All templates", "PDF & Audio export", "Basic analytics"],
      buttonText: "Start Creating",
      popular: false
    },
    {
      name: "Professional",
      price: "$29",
      description: "Most popular choice",
      features: ["Unlimited creations", "Premium templates", "All export formats", "Advanced analytics", "Priority support"],
      buttonText: "Go Professional",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$49",
      description: "For serious creators",
      features: ["Everything in Professional", "Custom branding", "White-label options", "API access", "Dedicated support"],
      buttonText: "Scale Up",
      popular: false
    }
  ]

  return (
    <section id="pricing" className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Simple, transparent pricing
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Choose the plan that fits your needs. Upgrade or downgrade at any time.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-lg border-2 p-6 ${
                plan.popular
                  ? 'border-[#000000] shadow-lg scale-105'
                  : 'border-gray-200 hover:border-gray-300'
              } transition-all`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#000000] text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {plan.price}
                  {plan.price !== "$0" && <span className="text-lg text-gray-600">/month</span>}
                </div>
                <p className="text-gray-600 text-sm">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 text-[#000000] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  plan.popular
                    ? 'bg-[#000000] text-white hover:bg-[#1a9b5c]'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
