document.querySelectorAll('.job-card').forEach(card => {
    card.addEventListener('click', function () {
        const jobType = this.getAttribute('data-job');
        const modalDetails = document.getElementById('jobModalDetails');
        const jobModal = document.getElementById('jobModal');
        const modalClose = document.querySelector('.job-modal-close');

        // Detalhes dinâmicos baseados no tipo de vaga
        const jobDetails = {
            'dev': `
                <h2>Desenvolvedor de Software</h2>
                <div class="job-info">
                    <p><strong>Empresa:</strong> TechInove Solutions</p>
                    <p><strong>Localização:</strong> Cuiabá, MT</p>
                    <p><strong>Salário:</strong> R$ 5.500 - R$ 8.000</p>
                    <h3>Requisitos</h3>
                    <ul>
                        <li>Experiência em JavaScript, React e Node.js</li>
                        <li>Conhecimentos em arquitetura de software</li>
                        <li>Graduação em Ciência da Computação ou áreas relacionadas</li>
                    </ul>
                    <h3>Benefícios</h3>
                    <ul>
                        <li>Plano de saúde</li>
                        <li>Vale alimentação</li>
                        <li>Horário flexível</li>
                    </ul>
                </div>
            `,
            'marketing': `
                <h2>Especialista em Marketing Digital</h2>
                <div class="job-info">
                    <p><strong>Empresa:</strong> Digital Marketing Co.</p>
                    <p><strong>Localização:</strong> Remoto</p>
                    <p><strong>Salário:</strong> R$ 4.000 - R$ 6.500</p>
                    <h3>Requisitos</h3>
                    <ul>
                        <li>Experiência com Google Ads e Facebook Ads</li>
                        <li>Conhecimento em SEO e análise de métricas</li>
                        <li>Criação de conteúdo para mídias sociais</li>
                    </ul>
                    <h3>Benefícios</h3>
                    <ul>
                        <li>Trabalho 100% remoto</li>
                        <li>Plano de desenvolvimento profissional</li>
                        <li>Bônus por performance</li>
                    </ul>
                </div>
            `,
            'support': `
                <h2>Analista de Suporte Técnico</h2>
                <div class="job-info">
                    <p><strong>Empresa:</strong> SupportPro Tecnologia</p>
                    <p><strong>Localização:</strong> Cuiabá, MT</p>
                    <p><strong>Salário:</strong> R$ 3.500 - R$ 5.000</p>
                    <h3>Requisitos</h3>
                    <ul>
                        <li>Conhecimentos em infraestrutura de TI</li>
                        <li>Experiência com suporte técnico de primeiro e segundo nível</li>
                        <li>Certificações técnicas serão um diferencial</li>
                    </ul>
                    <h3>Benefícios</h3>
                    <ul>
                        <li>Plano de saúde</li>
                        <li>Vale refeição</li>
                        <li>Programa de treinamento interno</li>
                    </ul>
                </div>
            `
        };

        // Preenche o modal com os detalhes da vaga
        modalDetails.innerHTML = jobDetails[jobType];

        // Mostra o modal
        jobModal.style.display = 'block';

        // Fecha o modal ao clicar no X
        modalClose.onclick = function () {
            jobModal.style.display = 'none';
        };

        // Fecha o modal clicando fora dele
        window.onclick = function (event) {
            if (event.target === jobModal) {
                jobModal.style.display = 'none';
            }
        };
    });
});