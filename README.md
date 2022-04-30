# Following are the steps to start the project
 
1. Download Folder
2. npm install
3. npx nodemon
4. hit the GET URL in RestClient or Browser http://localhost:3000/prices


# Enhancement steps to be taken

1. Cache API response on server start

2. More detailed error handling based on the status codes of third party integrations

3. Background caching of short term cache to maintain the API response

4. Localization for error messages


Notes: 

1. If this does not work, please check env file and replace the credentials of SDK

2. All tokens data is unavailable on the coingecko. Therefore, we have set default 0 value to handle it. We can change that to different value or hide it from our list.