# Como fazer funcionar?

O backend é feito em Laravel 7 e o Front end em React.
## O que preciso?
- Composer
- Node
- Wamp, Xampp, ou qualquer outro servidor php localhost com acesso a banco de dados mysql.


## Back-end

Assim que baixar os arquivos, entre na pasta

> api_Astrocommerce

E no terminal rode o comando

    Composer install
Lembrando que é necessário ter o composer instalado na sua maquina.

Após isso, faça uma copia do arquivo **.env.example** e renomeie ele para apenas **.env**. Após abra o arquivo e mude os campos:

    DB_CONNECTION=mysql   
    DB_HOST=127.0.0.1    
    DB_PORT=3306    
    DB_DATABASE=database_name    
    DB_USERNAME=root   
    DB_PASSWORD= 
Lembrando que o frontend está esperando uma resposta da url `127.0.0.1:8000` 
*Lembre-se de criar a Database e mudar o nome dela no .env, caso contrario os passos a seguir não funcionaram.*

Agora vamos criar as tabelas e popular o banco de dados com um usuário Administrador, Editor e um usuário comum. Para isso vá no terminal ainda no diretório do projeto e rode:

    php artisan migrate --seed

Feito isso você terá os seguintes usuários criados:

 - **Administrador**: 	
	 - Email: admin@admin.com
	 - Senha: 12345678A@
 - **Editor**: 	
	 - Email: editor@editor.com 
	 - Senha: 12345678E@ 
- **Comum**: 	
	- Email: user@user.com
	- Senha: 12345678U@

Por ultimo basta rodar o comando:

    php artisan serve
E o seu servidor já está com a API rodando localmente e esperando requisições.

## Front-End

Assim que baixar os arquivos, entre na pasta

> front-Astrocommerce

E no terminal rode o comando

    npm install
Lembrando que é necessário ter o node instalado na sua maquina.

Após isso o front já está preparado para entrar em funcionamento loca, basta rodar o comendo:

    npm start
    
  E aguardar, uma janela sera aberta no seu navegador e você já pode começar a fazer uso. 
  *Os dados de administrador está na sessão acima.*


## Detalhe de status dos produtos

Quando um produto é criado, automaticamente ele é colocado como **"em analise"** e apenas um administrador pode aprovar o produto para ele ficar como **"aprovado"**.

Porem quando um editor edita qualquer produto e salva ele, automaticamente ele atualiza e ganha um status de **"pendente"** 

Para um produto ser mostrado na Página inicial, ele tem que estar com o status **"aprovado"** e a visibilidade **"visível"**, caso contrario ele não será mostrado na página inicial.
