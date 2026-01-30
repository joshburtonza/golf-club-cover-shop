import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What size clubs do these headcovers fit?",
    answer:
      "Our headcovers are designed to fit standard driver heads up to 460cc, which covers most modern drivers on the market. They also work great with fairway woods and hybrids.",
  },
  {
    question: "How long does shipping take within South Africa?",
    answer:
      "We ship nationwide via courier. Orders are typically delivered within 3-5 business days to major cities, and 5-7 business days to rural areas. You'll receive a tracking number once your order ships.",
  },
  {
    question: "What is your returns policy?",
    answer:
      "We offer a 30-day hassle-free return policy. If you're not completely satisfied with your purchase, simply contact us and we'll arrange a return. Items must be unused and in original packaging.",
  },
  {
    question: "Are these covers durable for regular use?",
    answer:
      "Absolutely! Our headcovers are made with premium synthetic leather and reinforced stitching designed to withstand regular golf bag use. The magnetic closure ensures they stay securely on your clubs.",
  },
];

const FAQ = () => {
  return (
    <section className="py-16 sm:py-24 gradient-dark">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-gold font-body text-sm font-semibold tracking-widest uppercase">
              Got Questions?
            </span>
            <h2 className="font-display text-4xl sm:text-5xl mt-2">
              Frequently Asked
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-gold/50 transition-colors"
              >
                <AccordionTrigger className="font-display text-lg sm:text-xl hover:text-gold hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-body pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
