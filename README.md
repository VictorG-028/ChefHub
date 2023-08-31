# Instruções de instalação

### Perguntas e respostas úteis
<br>
<details>
  <summary>How to run on Linux or MacOS</summary>

  Etapas WSL são apenas para windows, então pule essas etapas.
  
  Para MacOS, talvez o Desktop Docker peça para baixar outra ferramenta semelhante ao WSL.
</details>
<br>
<details>
  <summary>O que é WSL ?</summary>
  
  O WSL Kernel, ou Windows Subsystem for Linux Kernel, é um componente do sistema operacional Windows que permite a execução de distribuições do Linux de forma nativa no Windows. O WSL Kernel é responsável por fornecer uma camada de compatibilidade entre os binários do Linux e o núcleo do Windows. Ele traduz as chamadas do sistema e os comandos do Linux para o formato compreensível pelo Windows.

  Anteriormente, o Windows não oferecia suporte nativo para a execução de aplicativos e comandos do Linux, o que exigia o uso de ferramentas de virtualização ou dual boot para alternar entre os sistemas operacionais. Com o WSL, os usuários podem executar um ambiente Linux completo, incluindo o acesso a uma linha de comando, utilitários e aplicativos, diretamente no Windows.
</details>
<br>
<details>
  <summary>Como o Supabase é instalado ?</summary>
  
  Supabase CLI é um modulo do NPM e pode ser instalado com `npm install supabase`. Essa CLI cria o container Supabase com o processo do Banco de Dados ao executar certos comandos. Nesse projeto, esse modulo é automaticamente baixado junto com todas as dependencias ao rodar `npm install`.
</details>
<br>
<details>
  <summary>Precisa instalar PostgreSQL ?</summary>
  Não, o Supabase magicamente lida com isso... eu acho...funciona na minha máquina :smiley:
</details>
<br>
<details>
  <summary>Porque `npx` antes de cada comando Supabase ?</summary>
  Porque Supabase é um pacote NPM e, sem nenhuma configuração adicional, não é reconhecido como um comando pelo terminal. NPX é um complemento instalado junto com NODEJS e NPM para não precisar fazer nenhuma configuração adicional.
</details>
<br>


### Observação: 
Será necessário criar 3 contas novas :point_down: 
- Desktop Docker (banco de dados roda no docker obrigatoriamente)
- Microsoft (para usar o bing img generator)
- Supabase (banco de dados)
- [opcional] Insomnia (serve pra salvar na nuvem e carregar dados entre máquinas diferentes)
<br>

## Passo a passo

1. Clone o projeto e abra um terminal na pasta `CHEFHUB-BACKEND`.
2. Execute `npm install` para instalar as dependências.
3. Configure o banco de dados Supabase:

    3.1. Confira os pré-requisitos na seção <u>Start Supabase services</u> da [documentação oficial](https://supabase.com/docs/guides/cli/local-development#start-supabase-services).

    3.2. Certifique-se de que o WSL está instalado e atualizado com o comando `wsl --update` em qualquer terminal. Você saberá se não está instalado ao receber um erro no comando `wsl`. Caso o WSL não esteja instalado, instale <u>Windows Subsystem for Linux</u> (WSL) na *Microsoft Store*.

    3.3. Certifique-se de que o Docker Desktop está baixado e em execução. Se surgir algum erro com WSL ou com Hypervisor, então esses erros precisam ser corrigidos para concluir essa etapa. Você pode baixá-lo [aqui](https://www.docker.com/products/docker-desktop/). A próxima etapa explicara como colocar o container do Supabase em execução.

    3.4. Esse próximo passo é complicado, então leia cada palavra com atenção! Para iniciar o container do banco de dados Supabase é necessário realizar 2 comandos no terminal. Confira se o terminal está aberto no diretório /ChefHub-Backend e que você já está logado na sua conta do Supabase.
    
      - 3.4.1. Primero comando: execute `npx Supabase init` e responda o pedido de token de acesso que o terminal vai pedir. Encontre o seu token acessando [supabase.com](https://supabase.com/) > Dashboard > Access Token > Generate new token. Guarde o seu token em um txt temporário. Aviso: não faça push nesse token no github. Ao ctrl+V (ou botão direito do mouse) o token de acesso no terminal, nada vai aparecer e isso é o mecanismo de segurança do Supabase (ele sempre deixa invisível informações sensíveis).
      
      - 3.4.2. Segundo comando: execute `npx Supabase start` e preencha as informações pedidas da mesma forma que a etapa do primeiro comando. Encontra a URL do projeto, a Anon Key acessando [supabase.com](https://supabase.com/) > Dashboard > ChefHub-Backend > ⚙️ Project Settings > API.

    3.5. Execute `npx supabase link --project-ref <project-id>` para vincular o projeto remoto com o local. Você pode obter `<project-id>` no URL do painel do seu projeto: `https://supabase.com/dashboard/project/<project-id>`. Acesse o painel do projeto entrando em [supabase.com](https://supabase.com/) > Dashboard > ChefHub-Backend > Você está no painel do projeto.

    3.6. Execute `npm run update_db` para trazer as mudanças feitas do projeto remoto para o projeto local.
4. Configure as variáveis de ambiente:

    4.1. Duplique o arquivo `.env.example` dentro da pasta `CHEFHUB-BACKEND`.

    4.2. Renomeie a cópia para `.env`.

    4.3. Dentro do arquivo `.env`, preencha os valores das variáveis de ambiente. O token de acesso guardado no .txt é o valor correto para a variável SUPABASE_LOGIN_TOKEN.
5. Finalmente, execute `npm run dev`


<!-- 

Figma: https://www.figma.com/file/O98HiGqkhaBn6RxM3F0ukH/Prot%C3%B3tipo?type=design&mode=design
Trello: https://trello.com/b/wx34aFsO/chefhub
Repositório do backend: https://github.com/VictorG-028/ChefHub-Backend
Repositório do frontend web: https://github.com/carlosgabriel311/ChefHub_WEB/tree/master
Repositório do frontend mobile: https://github.com/carlosgabriel311/ChefHub_MOBILE

Links de aprendizado usados nesse projeto
1- https://youtu.be/Jv2uxzhPFl4?t=249
2- https://www.youtube.com/watch?v=FgnxcUQ5vho
3- https://huafu.github.io/ts-jest/user/install
    https://jestjs.io/docs/expect
    https://plainenglish.io/blog/beginners-guide-to-testing-jest-with-node-typescript#supertest
    https://stackoverflow.com/questions/9517880/how-does-one-unit-test-routes-with-express
    https://www.npmjs.com/package/supertest
4- https://blog.logrocket.com/how-to-set-up-node-typescript-express/
5- https://www.stackhawk.com/blog/typescript-cors-guide-what-it-is-and-how-to-enable-it/
6- https://www.typescriptlang.org/docs/handbook/2/classes.html
7- https://github.com/nociza/Bimg/tree/main
8- https://www.youtube.com/watch?v=LjJFu6Y6MrU
9- https://www.youtube.com/watch?v=pvrKHpXGO8E
10- https://supabase.com/docs/guides/auth 
11- https://stackoverflow.com/questions/72300047/uploading-base64-images-to-supabase
12- https://supabase.com/docs/reference/javascript/installing
13- Como instalar supabase CLI: https://github.com/supabase/cli
14- https://microsoft.github.io/TypeChat/blog/introducing-typechat/
-->
