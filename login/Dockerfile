FROM node

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar os arquivos de package.json e package-lock.json para o diretório de trabalho
COPY package.json package-lock.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Compilar o aplicativo React + Vite
RUN npm run build

# Expor a porta necessária pelo aplicativo (por exemplo, a porta 3000)
EXPOSE 5173

# Comando para iniciar o servidor web
CMD ["npm", "run", "dev"]
