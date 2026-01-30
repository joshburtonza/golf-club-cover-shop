import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Will these headcovers improve my game?",
    answer:
      "Absolutely not. But you'll look significantly better while three-putting. Think of it as a confidence upgrade for your equipment, if not your swing.",
  },
  {
    question: "What size clubs do these fit?",
    answer:
      "Drivers up to 460cc (which is most modern drivers), plus fairway woods and hybrids. They're more forgiving than your playing partners when you're looking for your ball in the rough.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "3-5 business days to major cities, 5-7 to rural areas. Still faster than that group ahead of you looking for balls on every hole.",
  },
  {
    question: "What if I don't like them?",
    answer:
      "30-day returns, no questions asked. Unlike that 'gimme' you took from 6 feet, we won't make you prove anything. Just contact us and we'll sort it out.",
  },
  {
    question: "Why 'Topped It'?",
    answer:
      "Because every golfer has been there. That sickening thwack as you catch the top of the ball and it dribbles 30 metres. We named our brand after our worst shots so our customers don't have to hide from theirs.",
  },
  {
    question: "Are these durable?",
    answer:
      "Premium synthetic leather with reinforced stitching. Built to survive being thrown into the boot after a bad round. We've all been there.",
  },
  {
    question: "Can I buy just one?",
    answer:
      "Yes! R400 for a single (The Mulligan). But the 3-pack (The Scramble) at R700 saves you R500. That's at least 10 rounds of lost balls right there.",
  },
  {
    question: "Do you ship to my area?",
    answer:
      "We ship nationwide across South Africa via courier. Free shipping on orders over R500. If you can enter your address at checkout, we can get it to you.",
  },
];

const FAQ = () => {
  return (
    <section className="py-16 sm:py-24 gradient-dark">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-gold font-body text-sm font-semibold tracking-widest uppercase">
              Questions From the 19th Hole
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
