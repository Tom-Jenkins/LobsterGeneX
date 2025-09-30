# LobsterGeneX

## About
LobsterGeneX is a React web application designed to visualise gene expression results from ten different tissue types from the European lobster (_Homarus gammarus_).

Tissue types analysed:

* Eye, Gill, Nerve, Muscle, Heart
* Hepatopancreas, Gut
* Ovary, Testes
* Juvenile 

The gene annotation is available from [EnsemblMetazoa](https://metazoa.ensembl.org/Homarus_gammarus_gca958450375v1/Info/Index). All results reserved. Article in preperation (Paris _et al_.). To launch the application, click the link below.

To view the count data click on one of the links below:  
[Normalised count data](https://github.com/Tom-Jenkins/LobsterGeneX/blob/main/public/protein_coding_expression_normalised_counts.csv)  
[VST count data](https://github.com/Tom-Jenkins/LobsterGeneX/blob/main/public/protein_coding_expression_VST_counts.csv)

To launch the application click the link below:  
[www.lobstergenex.com](https://lobstergenex.com)

## Developer
The app has been developed using [ReactJS](https://react.dev/) + [Vite](https://vite.dev/). 

### Dependencies

* Node.js (tested with v20.6.1)
* Node Package Manager (test with v9.8.1)

### Setup environment

Clone repo: 
```
git clone https://github.com/Tom-Jenkins/LobsterGeneX.git
cd LobsterGeneX/
```

Install node package versions from package.json:  
```
npm install
```

Run application locally in developer mode:
```
npm run dev
```
