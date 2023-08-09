# 📔 Insomnia Guide

## Setup steps
1. [Download insomnia here](https://insomnia.rest/download).
2. Download **./documentation/Insomnia_Request_without_env_var.json** file
3. Create a personal project named ChefHub.
4. Create a collection of requests with any name.
5. Open the collection. Click on top of the insomnia window, in the collection name.
6. Select 'import/export data'. 
7. Select 'Import to the "ChefHub" Project'.
8. Load Insomnia_Request_without_env_var.json.
9. Inside the collection, create a new environment with any name
10. Inside manage environment, fill the json:
```json 
{
	"GPT_API_KEY": "fill key here",
  "BING_IMAGE_COOKIE": "fill cookie _U pode ser encontrado no Dev Tools F12, na aba Aplicativo ao estar logado no bimg img creator",
	"BING_URL": "https://www.bing.com/images/create?q=bolo-de-chocolate&rt=3&FORM=GENCRE"
}
```

