## Instruções de instalação

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
<br>

1. Clone o projeto e abra um terminal na pasta `CHEFHUB-BACKEND`.
2. Execute `npm install` para instalar as dependências.
3. Configure o banco de dados Supabase:

    3.1. Confira os pré-requisitos na [documentação oficial](https://supabase.com/docs/guides/getting-started/local-development).

    3.2. Certifique-se de que o WSL está atualizado com o comando `wsl --update` em qualquer terminal.

    3.3. Certifique-se de que o Docker Desktop está baixado e em execução. Você pode baixá-lo [aqui](https://www.docker.com/products/docker-desktop/).

    3.4. Execute `npx supabase link --project-ref <project-id>` para vincular o projeto remoto com o local. Você pode obter `<project-id>` no URL do painel do seu projeto: `https://supabase.com/dashboard/project/<project-id>`.

    3.5. Execute `npx supabase db remote commit` para trazer as mudanças feitas do projeto remoto para o projeto local.
4. Configure as variáveis de ambiente:

    4.1. Duplique o arquivo `.env.example` dentro da pasta `CHEFHUB-BACKEND`.

    4.2. Renomeie a cópia para `.env`.

    4.3. Dentro do arquivo `.env`, preencha os valores das variáveis de ambiente.
5. Finalmente, execute `npm run dev`


<!-- 

Figma: https://www.figma.com/file/O98HiGqkhaBn6RxM3F0ukH/Prot%C3%B3tipo?type=design&mode=design
Trello: https://trello.com/b/wx34aFsO/chefhub
Repositório do backend: https://github.com/VictorG-028/ChefHub-Backend
Repositório do frontend web:
Repositório do frontend mobile:

Links de aprendizado usados nesse projeto
1- https://youtu.be/Jv2uxzhPFl4?t=249
2- https://www.youtube.com/watch?v=FgnxcUQ5vho
3- https://blog.logrocket.com/how-to-set-up-node-typescript-express/
4- https://www.stackhawk.com/blog/typescript-cors-guide-what-it-is-and-how-to-enable-it/
5- https://www.typescriptlang.org/docs/handbook/2/classes.html
6- https://github.com/nociza/Bimg/tree/main
7- https://www.youtube.com/watch?v=LjJFu6Y6MrU
8- https://www.youtube.com/watch?v=pvrKHpXGO8E
9- https://supabase.com/docs/guides/auth 
10- https://stackoverflow.com/questions/72300047/uploading-base64-images-to-supabase
11- https://supabase.com/docs/reference/javascript/installing
12 Como instalar supabase CLI: https://github.com/supabase/cli
-->
