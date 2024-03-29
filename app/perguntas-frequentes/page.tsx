import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import React from 'react';

const FAQ: React.FC = () => {
  return (
    <div className='w-full px-4'>
      <h1 className='font-bold text-xl mb-4 mt-6'>Perguntas frequentes (FAQ)</h1>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Quais são as formas de pagamento?</AccordionTrigger>
          <AccordionContent>
            Para manter os preços baixos e a qualidade oferecida, aceitamos apenas pagamentos via PIX.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Por que é tão barato?</AccordionTrigger>
          <AccordionContent>
            Nossos produtos vêm diretamente de fábricas asiáticas e europeias. Diferentemente de outras lojas, não superfaturamos os valores dos produtos; cobramos apenas uma pequena taxa de serviço já inclusa nos preços do nosso site.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Como funciona?</AccordionTrigger>
          <AccordionContent>
            Para comprar, contate-nos via WhatsApp com o produto desejado. Em média, após 5 dias úteis, o tênis chegará ao nosso armazém. Então, enviaremos fotos reais para sua avaliação antes do envio ao seu endereço.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Qual é o valor do frete?</AccordionTrigger>
          <AccordionContent>
            O valor do frete é baseado no peso do pacote (0-3kg), que será calculado após a aprovação do produto.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>Não gostei do produto que chegou no armazém.</AccordionTrigger>
          <AccordionContent>
            Se o produto no armazém não atender às suas expectativas, oferecemos a opção de troca ou devolução do seu dinheiro.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>Acompanha caixa?</AccordionTrigger>
          <AccordionContent>
            Todos os produtos chegam ao armazém com a caixa. No entanto, o envio com ou sem a caixa fica a critério do cliente, visto que ela acrescenta peso adicional ao frete.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-7">
          <AccordionTrigger>Não serviu, como proceder?</AccordionTrigger>
          <AccordionContent>
            Caso o produto não sirva, não podemos realizar a devolução por ser importado. Porém, daremos suporte para que você possa revender o produto, garantindo o recebimento do seu investimento de volta ou até mesmo um lucro.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-8">
          <AccordionTrigger>Qual é o prazo de entrega?</AccordionTrigger>
          <AccordionContent>
            O prazo médio de entrega é de 15 dias úteis após a postagem, variando de acordo com sua região. A entrega pode ser mais rápida para locais próximos à principal alfândega de importação, em Curitiba.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-9">
          <AccordionTrigger>O pacote foi taxado, vocês pagam?</AccordionTrigger>
          <AccordionContent>
            O valor pago inicialmente por nossos serviços não abrange as taxas de importação cobradas pelos Correios, que giram em torno de R$10,00 por par de tênis.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQ;
