# Pricing Strategy Class

Este projeto implementa uma estratégia de precificação modular e extensível em TypeScript. Ele permite calcular preços com base em diferentes estratégias de desconto, como descontos para clientes fiéis, descontos por volume e promoções sazonais.

## Estrutura do Projeto

- **src/pricing/**: Contém a lógica principal de precificação e as interfaces.

  - `context.ts`: Gerencia o contexto para aplicar estratégias de desconto.
  - `discount-strategy.interface.ts`: Define a interface para estratégias de desconto.
  - `price-calculator.ts`: Implementa o cálculo de preços com base nas estratégias fornecidas.
  - **strategies/**: Contém implementações específicas de estratégias de desconto.
    - `bulk-discount.strategy.ts`: Estratégia de desconto por volume.
    - `loyal-customer.strategy.ts`: Estratégia de desconto para clientes fiéis.
    - `november-electronics.strategy.ts`: Estratégia de desconto sazonal para eletrônicos em novembro.

- **tests/**: Contém os testes unitários para o projeto.
  - `price-calculator.test.ts`: Testa a funcionalidade do cálculo de preços.

## Como Executar os Testes

1. Certifique-se de ter o Node.js instalado.
2. Instale as dependências do projeto:
   ```bash
   npm install
   ```
3. Execute os testes:
   ```bash
   npm test
   ```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests para melhorias ou correções.
