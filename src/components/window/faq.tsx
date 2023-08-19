import React, { useState } from "react";

const FAQSection: React.FC = () => {
  // State to track the open/closed state of each FAQ item
  const [isOpen, setIsOpen] = useState<boolean[]>(Array(5).fill(false));

  // Function to toggle the open/closed state of a FAQ item
  const toggleFAQ = (index: number) => {
    const newIsOpen = [...isOpen];
    newIsOpen[index] = !newIsOpen[index];
    setIsOpen(newIsOpen);
  };

  return (
    <section className="bg-gray-100  mt-10">
      <div className="container mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-left ml-2 relative mb-10">
            <h4 className="text-3xl font-semibold text-gray-800 mb-8">
              Frequently Asked Questions
            </h4>
            <div
              style={{ top: "1.5rem", transform: "translateY(50%)" }}
              className="h-1 w-32 absolute bottom-0 left-0 mt-5 bg-ui-red hidden md:block"
            ></div>
          </div>
          <div className="space-y-4">
            {FAQData.map((faq, index) => (
              <div key={index} className="border-b border-gray-300">
                <div
                  className="flex items-center justify-between cursor-pointer py-10"
                  onClick={() => toggleFAQ(index)}
                >
                  <h5 className="text-lg font-semibold text-gray-800">
                    {faq.question}
                  </h5>
                  <span
                    className={`transition-transform transform text-ui-red ${
                      isOpen[index] ? "rotate-45" : ""
                    }`}
                  >
                    ➜
                  </span>
                </div>
                <p
                  className={`text-gray-600 py-5 ${
                    isOpen[index] ? "block" : "hidden"
                  }`}
                >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

const FAQData = [
  {
    question: "How can I place an order on your ecommerce website?",
    answer:
      "To place an order, simply browse our products, select the items you wish to purchase, add them to your cart, and proceed to checkout. Follow the steps to provide your shipping details, select a payment method, and confirm your order.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept various payment methods, including credit cards, debit cards, PayPal, and other secure online payment gateways. You can choose the most convenient option during the checkout process.",
  },
  {
    question: "How long will it take to receive my order?",
    answer:
      "The delivery time depends on several factors, such as your location and the shipping method chosen. We strive to process orders promptly and provide estimated delivery times during checkout. You can also track your order's progress through our website.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We have a flexible return policy to ensure your satisfaction. If you are not completely satisfied with your purchase, you can initiate a return within a specified period, typically 30 days. Please review our return policy for detailed instructions on how to return or exchange a product.",
  },
  {
    question:
      "How secure is my personal and payment information on your website?",
    answer:
      "We take customer security seriously. Our website uses industry-standard encryption protocols to safeguard your personal and payment information. We do not store your credit card details, and all transactions are processed through secure and trusted payment gateways.",
  },
];
