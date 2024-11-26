# Habilita o serviço Google Cloud Run
# O Cloud Run é usado para executar aplicativos containerizados sem necessidade de gerenciar servidores
gcloud services enable run.googleapis.com

# Habilita o serviço Google Cloud Build
# O Cloud Build automatiza o processo de construção, testes e deploy de aplicativos
gcloud services enable cloudbuild.googleapis.com

# Habilita o serviço Google Artifact Registry
# O Artifact Registry é usado para armazenar e gerenciar imagens de contêiner e outros pacotes
gcloud services enable artifactregistry.googleapis.com
