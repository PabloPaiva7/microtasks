# TaskShift - Sua Jornada de Trabalho Online

https://earn-your-time-21.lovable.app/
https://silver-kangaroo-72a643.netlify.app/

## 📌 Sobre o Projeto
O **TaskShift** é um SaaS inovador que permite que qualquer pessoa organize e gerencie suas atividades de microtarefas online em um só lugar.  
Com uma interface moderna, recursos de gestão de tempo e conversão de ganhos em moeda estrangeira, o TaskShift transforma a experiência de quem busca **renda extra e produtividade no trabalho remoto**.

---

## 🚀 Funcionalidades Atuais
- **Dashboard Integrado:** visão geral da jornada de trabalho e status em tempo real.  
- **Banco de Tarefas:** registro e organização das microtarefas diárias.  
- **Escala de Trabalho:** definição de horários de expediente e pausas.  
- **Relatório de Ganhos:** histórico completo, separação de valores recebidos e pendentes.  
- **Conversor de Moeda (USD/BRL):** cálculo rápido e preciso para quem recebe em moeda estrangeira.  
- **Simulador de Orçamento:** estimativa de ganhos com base no tempo disponível de trabalho.  
- **Centro de Treinamento:** espaço para conteúdos de capacitação e aumento de produtividade.

---

## 🎯 Público-Alvo
- Pessoas em busca de **renda extra**  
- **Estudantes** com disponibilidade parcial  
- **Freelancers** e profissionais autônomos  
- **Desempregados** em busca de alternativas rápidas de rendimento  
- Trabalhadores de **países emergentes** que se beneficiam de pagamentos em moeda estrangeira

---

## 🌐 Integrações Futuras
Planejamos integrar o TaskShift diretamente com as principais plataformas de microtarefas:  
- **SproutGigs**  
- **Amazon Mechanical Turk (MTurk)**  
- **Appen**  
- **Clickworker**  

Com isso, os usuários poderão **gerenciar múltiplas fontes de renda em um único painel**.

---

## 🛠️ Tecnologias Utilizadas
- **Frontend:** Lovable (React + PWA)  
- **Backend:** Supabase (banco de dados e autenticação)  
- **Automação:** n8n (integração com alertas e tarefas externas)  
- **IA Recomendações (futuro):** OpenAI API

---

## 📅 Roadmap
1. **MVP Atual:**  
   - Conversor de moedas USD/BRL  
   - Simulador de jornada de trabalho  
   - Gestão de expediente em tempo real  
   - Relatórios básicos de ganhos  
2. **Versão 2.0:**  
   - Integração com plataformas de microtarefas  
   - Recomendações inteligentes de tarefas via IA  
   - Alertas automáticos (WhatsApp, Telegram, E-mail)  
3. **Futuro:**  
   - Marketplace interno de microtarefas  
   - Gamificação da produtividade e sistema de ranking

---

## 📊 Arquitetura Planejada
```mermaid
graph TD
    A[Usuário] -->|Acessa| B[Frontend TaskShift]
    B --> C[Supabase]
    B --> D[n8n Automations]
    D --> E[Plataformas de Microtarefas]
    B --> F[OpenAI API - IA Recomendações]
    C --> G[Relatórios e Histórico]
    D --> H[Alertas e Integrações]
