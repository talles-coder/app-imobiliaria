# app-imobiliaria

Aplicativo para gerenciamento de vendas

Foco do Aplicativo:

O aplicativo tem como objetivo o cadastramento de loteamentos/terrenos ou casas, para que corretores e gestores possam monitorar quais lotes estão disponíveis, reservados e vendidos evitando assim equivocos onde um corretor venda um lote que já esta vendido ou reservado para outra pessoa.

Tecnologias utilizadas: 

Por se tratar de um aplicativo Simples de cadastro e gerenciamento, não foi desenvolvido um Back-End externo (pensando também em reuzir custos operacionais), porém o controle de acesso é feito pela API FireBase do google.

O aplicativo foi desenvolvido em React Native, e copilado utilizando o Expo SDK versão 39.0.0, como o intuito do aplicativo é ser utilizado internamente pela empresa imbiliaria, não foi gerado a versão para IOS e não foi postado na loja de aplicativos do android (Play Store).

Estão sendo utilizadas as API's do google: 

Maps SDK for Android: API que apresenta uma interface de mapa do Google Maps,

Geocoding API: API que faz pesquisas baseado na localização ou edereço fornecido pelo usuário,

Cloud Firestore API: Banco de dados não relacional que esta armazenando todos os dados do aplicativo.

Acesso : 

O acesso ao aplicativo é restrito aos colaboradores da empresa.
