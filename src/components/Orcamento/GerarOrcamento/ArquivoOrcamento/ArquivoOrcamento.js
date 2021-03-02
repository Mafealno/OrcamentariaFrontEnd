import React from 'react';
import "./ArquivoOrcamento.css";
import { Page, Text, View, Document, Image, Link, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import Tabela from "./Tabela/Tabela";
import Linha from "./Tabela/Linha/Linha";
import Coluna from "./Tabela/Linha/Coluna/Coluna";
import logo from "../../../../img/Logo-PDF.png";
import logoBombeirosSp from "../../../../img/logo-bombeiros-sp.png";
import logoAbnt from "../../../../img/logo-abnt.jpg";
import trrf from "../../../../img/trrf.jpg";
import setaVermelha from "../../../../img/setaVermelha.png";
import imgProcessos from "../../../../img/processos.png";

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    paddingTop: 30,
    paddingHorizontal: 50
  },
  body: {
    height: '94%'
  },
  sessao: {
      marginBottom: 15
  },
  centralizar_texto:{
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  textoPadrao:{
    fontSize: 11,
    lineHeight: 2.3,
    textAlign: 'justify',
},
  textoPadraoTitulo:{
      fontSize: 11
  },
  titulo_azul: {
    textTransform: 'uppercase',
    fontSize: 11,
    color: '#0070C0'
  },
  titulo_vermelho: {
    fontSize: 11,
    color: 'red'
  },
  destaque_vermelho: {
      color: 'red',
      fontWeight: 'bold'
  },
  negrito: {
      fontWeight: 'bold',
  },
  cabecalho: {
    textTransform: 'uppercase',
    color: 'red',
    fontWeight: 'ultrabold',
    fontSize: 11,
    width: '100%',
    textAlign: 'center',
    height: 40,
    top: 0
  },
  rodape: {
    display: 'flex', 
    flexGrow: 1,
    justifyContent: 'flex-end',
    color: 'red',
    fontWeight: 'bold',
    fontSize: 11,
    textAlign: 'center',
    width: '100%',
    lineHeight: 1.2
  },
  estiloLogoCapa:{
      display: 'flex',
      flexDirection: 'row',
      width: 145  
    },
  logoCapa: {
      width: 360,
      height: 100
  },
  containerRodapePagina1: {
      display: 'flex',
      flexDirection: 'row'
  },
  logoBombeirosSp: {
      width: 70,
      height: 70,
      marginRight: 20
  },
  logoAbnt: {
    width: 170,
    height: 70
},
  textoLogoCapa:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 11,
      fontWeight: 'black',
      fontStyle: 'oblique',
      padding: '10%',
      textAlign: 'center'
  },
informacaoRodapeQuimico: {
    display: 'flex',
    alignItems: 'flex-end'
},
containerTrrf: {
    height: 35, 
    width: 150, 
    border: 2, 
    backgroundColor: 'yellow'
},
tituloTabela: {
    backgroundColor: '#95B3D7',
    fontWeight: 'bold'
},
totalTabela: {
    backgroundColor: '#DCE6F1'
}

});

function ArquivoOrcamento() {
    return (
        <PDFViewer className="h-100-pc w-100-pc">
            <Document
            title={"teste"}>
                <Page style={styles.page}>
                    <View style={styles.body}>
                        <View style={styles.sessao}>
                            <View fixed>
                                <Text style={styles.cabecalho}>
                                    www.dcppinturastecnicas.com.br
                                </Text>
                            </View>
                            <View style={styles.estiloLogoCapa}>
                                <Image style={styles.logoCapa} src={logo}/>
                                <Text className="bold" style={styles.textoLogoCapa}>
                                    Serviços e Atividades {"       "}  
                                    Realizadas de Acordo as
                                    Normas ABNT 14.432, {"   "}
                                    Instrução Técnica CB 08 e
                                    Instrução Técnica CB 10.
                                </Text>
                            </View>
                        </View>
                        <View style={styles.sessao}>
                            <Tabela tamanho={150}>
                                <Linha>
                                    <Coluna tamanho={{ width: 80 }}>Data</Coluna>
                                    <Coluna tamanho={{ flexGrow: 1 }}></Coluna>
                                </Linha>
                                <Linha>
                                    <Coluna tamanho={{ width: 80 }}>Cliente</Coluna>
                                    <Coluna tamanho={{ flexGrow: 1 }}></Coluna>
                                </Linha>
                                <Linha>
                                    <Coluna tamanho={{ width: 80 }}>A/C</Coluna>
                                    <Coluna tamanho={{ flexGrow: 1}}></Coluna>
                                    <Coluna tamanho={{ width: 100}}>Telefone</Coluna>
                                    <Coluna tamanho={{ flexGrow: 1}}></Coluna>
                                </Linha>
                                <Linha>
                                    <Coluna tamanho={{ width: 80 }}>Obra</Coluna>
                                    <Coluna tamanho={{ flexGrow: 1 }}></Coluna>
                                </Linha>
                                <Linha>
                                    <Coluna tamanho={{ width: 80 }}>Ref.</Coluna>
                                    <Coluna tamanho={{ flexGrow: 1 }}></Coluna>
                                </Linha>
                            </Tabela>
                        </View>
                        <View style={styles.sessao}>
                            <Text style={[styles.textoPadraoTitulo, styles.negrito]}>
                                Prezado Srs.
                            </Text>
                        </View>
                        <View style={styles.sessao}>
                            <Text style={[styles.textoPadrao]}>
                                Atendendo a solicitação, temos à satisfação de submeter a vossa apreciação nossa proposta
                                técnica comercial para fornecimento <Link style={styles.destaque_vermelho}>MÃO DE OBRA</Link> de 
                                pintura de <Link style={styles.negrito}>PROTEÇÃO PASSIVA ANTI CHAMA - PINTURA INTUMESCENTE DE ALTA QUALIDADE </Link>, a fim de 
                                atender as legislações em vigor do Corpo de Bombeiros e o Decreto Estadual N. 63.911 de 
                                10.12.2018. Esta cotação contempla o fornecimento de produtos para aplicação e mão de obra 
                                especializada, embora os faturamentos e condições comerciais sejam distintos, verificar o 
                                item 6 desta proposta. Permanecendo à disposição para eventuais esclarecimentos, agradecemos 
                                pela oportunidade de podermos participar deste processo e reafirmarmos nosso interesse em
                                fornecer sistemas de isolamento contra o fogo de alta qualidade à sua empresa com as
                                competências técnicas necessárias para a realização de sua obra.
                            </Text>
                        </View>
                        <View style={styles.sessao}>
                            <View style={styles.containerRodapePagina1}>
                                <View style={[{flexGrow: 1}]}>
                                    <Image style={styles.logoBombeirosSp} src={logoBombeirosSp}/>
                                </View>
                                <View style={[{flexGrow: 1}]}>
                                    <Image style={styles.logoAbnt} src={logoAbnt}/>
                                </View>
                                <View style={[{flexGrow: 1}]}>
                                    <View style={[styles.textoPadrao, styles.informacaoRodapeQuimico, {lineHeight: 1}]}>
                                        <Text>André Nogueira</Text>
                                        <Text>Responsável Técnico</Text>
                                        <Text>CRQ IV Região - 04165118</Text>
                                        <Text>(11) 95907.0150 </Text>
                                        <Text>andre@dcppinturastecnicas.com.br</Text>
                                        <Text>www.dcppinturastecnicas.com.br</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.rodape]} fixed>
                            <Text>DCP Pinturas Técnicas</Text>
                            <Text style={[{color: 'black'}]}>Soluções Inovadoras, Eficientes e Confiáveis Para a Construção Civil</Text>
                        </View>
                    </View>
                </Page>
                <Page style={styles.page}>
                    <View style={styles.body}>
                    <View style={[styles.sessao]} fixed>
                            <Text style={styles.cabecalho}>
                                www.dcppinturastecnicas.com.br
                            </Text>
                        </View>
                        <View style={[styles.sessao]}>
                            <Text style={styles.titulo_azul}>
                                PINTURA INTUMESCENTE – PROTEÇÃO PASSIVA PROTEÇÃO CONTRA INCÊNDIOS 
                            </Text>
                        </View>
                        <View style={[styles.sessao]}>
                            <Text style={[styles.textoPadrao]}>
                                O sistema de proteção passiva por <Link style={[{color: 'red'}]}>PINTURAS INTUMESCENTES</Link> é processo 
                                de proteção de estruturas metálicas e ou outros materiais previstas por normas nacionais e internacionais 
                                para que em um determinado local em situação de fogo possa haver tempo de evacuação do local, assim 
                                também como tempo de chegada e saída do local pelo Corpo de Bombeiros, entre outras autoridades com 
                                proteção a vida e proteção ao patrimônio.
                            </Text>
                        </View>
                        <View style={[styles.sessao, styles.centralizar_texto]}>
                            <Text style={[styles.titulo_vermelho]}>
                                ESPECIFICAÇÃO TÉCNICA DO PRODUTO
                            </Text>
                        </View>
                        <View style={[styles.sessao]}>
                            <Text style={[styles.textoPadrao]}>
                                Reduzir a propagação das chamas e fumaça, retardar o tempo princípio do incêndio
                                generalizado, prevenir a perda de vidas, minimizar a perda de bens e propriedades.
                                Garantir a segurança das pessoas em um eventual caso de incêndio, permitindo a evacuação 
                                do local em tempo hábil e de forma segura.
                            </Text>
                        </View>
                        <View style={[styles.sessao]}>
                            <Text style={styles.titulo_azul}>
                                NORMAS APLICÁVEIS 
                            </Text>
                        </View>
                        <View style={[styles.sessao]}>
                            <Text style={[styles.textoPadrao]}>
                                Os materiais e serviços especificados, relativos ao serviço acima, obedecem às seguintes
                                normas e Instruções pertinentes.
                            </Text>
                        </View>
                        <View style={[styles.sessao]}>
                            <Tabela tamanho={170}>
                                <Linha>
                                    <Coluna tamanho={{width: 80}}>NBR 14432</Coluna>
                                    <Coluna>Exigências De Resistência Ao Fogo De Elementos Construtivos De Edificações Procedimento</Coluna>
                                </Linha>
                                <Linha>
                                    <Coluna tamanho={{width: 80}}>IT-08 CBSP</Coluna>
                                    <Coluna tamanho={{flexGrow: 1}}>Resistência Ao Fogo Dos Elementos De Construção</Coluna>
                                </Linha>
                                <Linha>
                                    <Coluna tamanho={{width: 80}}>ASTM E-119</Coluna>
                                    <Coluna tamanho={{flexGrow: 1}}>Fire Tests of Building Construction and Materials</Coluna>
                                </Linha>
                                <Linha>
                                    <Coluna tamanho={{width: 80}}>ICC AC23</Coluna>
                                    <Coluna>Acceptance Criteria or Spray - Applied and Intumescent Mastic Coating Fire-Protection Materials</Coluna>
                                </Linha>
                                <Linha>
                                    <Coluna tamanho={{width: 80}}>63.911</Coluna>
                                    <Coluna tamanho={{flexGrow: 1}}>Decreto Estadual de 10.12.2018</Coluna>
                                </Linha>
                            </Tabela>
                        </View>
                        <View style={[styles.sessao]}>
                            <Text style={styles.titulo_azul}>
                                1. SISTEMA DE PROTEÇÃO UTILIZADO 
                            </Text>
                        </View>
                        <View style={[styles.sessao]}>
                            <Text style={[styles.textoPadrao]}>
                                Conforme determinado, será aplicada	para proteção da estrutura metálica a TINTA 
                                INTUMESCENTE SHERWIN WILLIANS FIRETEX FX 5062 - Balde 20 Litros. Tinta certificada pelo
                                Laboratório WarringtonFire Testing and Certification Limited sob Certificate Of Approval N. CF
                                5267, valido até dia 05 de agosto de 2024.
                            </Text>
                        </View>
                        <View style={styles.rodape} fixed>
                            <Text>DCP Pinturas Técnicas</Text>
                            <Text style={[{color: 'black'}]}>Soluções Inovadoras, Eficientes e Confiáveis Para a Construção Civil</Text>
                        </View>
                    </View>
                </Page>
                <Page style={styles.page}>
                    <View style={styles.body}>
                        <View style={[styles.sessao]} fixed>
                            <Text style={styles.cabecalho}>
                                www.dcppinturastecnicas.com.br
                            </Text>
                        </View>
                        <View style={[styles.sessao]}>
                            <Text style={styles.titulo_azul}>
                                2. ENQUADRAMENTO DA EDIFICAÇÃO  
                            </Text>
                        </View>
                        <View style={[styles.sessao]}>
                           <Tabela tamanho={100}>
                               <Linha>
                                   <Coluna tamanho={{width: 150}}>2.1 - Grupo</Coluna>
                                   <Coluna tamanho={{width: 150}}></Coluna>
                               </Linha>
                               <Linha>
                                   <Coluna tamanho={{width: 150}}>2.2 - Ocupação de Uso</Coluna>
                                   <Coluna tamanho={{width: 150}}></Coluna>
                               </Linha>
                               <Linha>
                                   <Coluna tamanho={{width: 150}}>2.3 - Divisão</Coluna>
                                   <Coluna tamanho={{width: 150}}></Coluna>
                               </Linha>
                               <Linha>
                                   <Coluna tamanho={{width: 150}}>2.4 - Classe</Coluna>
                                   <Coluna tamanho={{width: 150}}></Coluna>
                               </Linha>
                           </Tabela>
                        </View>
                        <View style={[styles.sessao]}>
                            <Text style={styles.titulo_azul}>
                                3. TRRF – TEMPO REQUERIDO DE RESISTÊNCIA AO FOGO 
                            </Text>
                        </View>
                        <View style={[styles.sessao, {display: 'flex', flexDirection: 'row'}]}>
                            <View>
                                <Image style={[{height: 110, width: 150}]} src={trrf}></Image>
                            </View>
                            <View style={[{paddingLeft: 10}]}>
                                <Text style={[styles.textoPadrao]}>
                                    Conforme informado pelo cliente, a espessura de proteção está {"                        "}
                                    dimensionada para atendimento a um <Link style={styles.destaque_vermelho}>TRRF</Link> de:
                                </Text>
                                <View style={[{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}]}>
                                    <Image style={[{width: 100, height: 40, paddingLeft: 30}]} src={setaVermelha}></Image>
                                    <View style={[{width: 20}]}></View>
                                    <View style={[styles.containerTrrf, styles.centralizar_texto]}>
                                        <Text style={[{fontSize: 13}]}> minutos</Text>
                                    </View>
                                </View>
                            </View>
                           
                        </View>
                        <View style={[styles.sessao]}>
                            <Text style={styles.titulo_azul}>
                                4. ESCOPO DAS ATIVIDADES DE APLICAÇÃO PINTURA INTUMESCENTE  
                            </Text>
                        </View>
                        <View style={[styles.sessao]}>
                            <Text style={styles.titulo_vermelho}>
                                Sistema de Pintura a ser realizado:
                            </Text>
                        </View>
                        <View style={[styles.sessao]}>
                            <Text style={[styles.textoPadrao]}>{'-'} Esmerilhamento e ou lixamento e ou limpeza da superfície;</Text>
                            <Text style={[styles.textoPadrao]}>
                                {'-'} Aplicação da TINTA INTUMESCENTE SHERWIN WILLIANS FIRETEX conforme 
                                espessura em micras de acordo a especificação da carta de cobertura 
                                do fabricante e conforme fator de massividade da estrutura.
                            </Text>
                            <Text style={[styles.textoPadrao]}>{'-'} Aplicação de Tinta de acabamento (TOP COAT) sobre a pintura intumescente.</Text>
                        </View>
                        <View style={[styles.sessao]}>
                            <Image style={[{width: '100%', height: 100}]} src={imgProcessos}/>
                        </View>
                        <View style={styles.rodape} fixed>
                            <Text>DCP Pinturas Técnicas</Text>
                            <Text style={[{color: 'black'}]}>Soluções Inovadoras, Eficientes e Confiáveis Para a Construção Civil</Text>
                        </View>
                    </View>
                </Page>
                <Page style={styles.page}>
                    <View style={styles.body}>
                        <View style={[styles.sessao]} fixed>
                            <Text style={styles.cabecalho}>
                                www.dcppinturastecnicas.com.br
                            </Text>
                        </View>
                        <View style={[styles.sessao]}>
                            <Text style={styles.titulo_azul}>
                                5. PREÇOS E CONDIÇÕES COMERCIAIS (Mão de Obra - Aplicação)
                            </Text>
                        </View>
                        <View style={[styles.sessao]}>
                            <Tabela tamanho={100}>
                                <Linha>
                                    <Coluna tamanho={{width: 100, backgroundColor: '#95B3D7'}}>Quantidade m²</Coluna>
                                    <Coluna tamanho={{flexGrow: 1, backgroundColor: '#95B3D7'}}>Descrição das Atividades</Coluna>
                                    <Coluna tamanho={{width: 100, backgroundColor: '#95B3D7'}}>R$ SUBTOTAL</Coluna>
                                </Linha>
                                <Linha>
                                    <Coluna tamanho={{width: 100}}></Coluna>
                                    <Coluna tamanho={{flexGrow: 1}}></Coluna>
                                    <Coluna tamanho={{width: 100, backgroundColor: '#DCE6F1'}}></Coluna>
                                </Linha>
                                <Linha>
                                    <Coluna tamanho={{width: 100}}></Coluna>
                                    <Coluna tamanho={{flexGrow: 1}}></Coluna>
                                    <Coluna tamanho={{width: 100, backgroundColor: '#DCE6F1'}}></Coluna>
                                </Linha>
                            </Tabela>
                        </View>
                        <View style={[styles.sessao, styles.centralizar_texto]}>
                            <Text style={[styles.titulo_vermelho]}>
                                Total da Cotação (Somente Mão de Obra / Aplicação)
                            </Text>
                        </View>
                        <View style={[styles.sessao]}>
                           <Tabela tamanho={30}>
                               <Linha>
                                   <Coluna tamanho={{width: 350, backgroundColor: '#95B3D7'}}>Produtos + Mão de Obra / Aplicação</Coluna>
                                   <Coluna tamanho={{flexGrow: 1, backgroundColor: '#DCE6F1', color: 'red'}}>R$</Coluna>
                               </Linha>
                           </Tabela>
                        </View>
                        <View style={[styles.sessao]}>
                            <Text style={[styles.titulo_azul]}>
                                6.	CONDIÇÕES DE PAGAMENTO
                            </Text>
                        </View>
                        <View style={[styles.sessao]}>
                            <Tabela tamanho={70}>
                                <Linha>
                                    <Coluna tamanho={{flexGrow: 1, maxWidth: '100%', backgroundColor: '#95B3D7'}}>CONDIÇÕES DE PAGAMENTO - FATURAMENTO</Coluna>
                                </Linha>
                                <Linha>
                                    <Coluna tamanho={{width: 150, backgroundColor: '#95B3D7', color: 'red'}}>Fornecedor</Coluna>
                                    <Coluna tamanho={{flexGrow: 1, backgroundColor: '#DCE6F1', color: 'red'}}>ITENS</Coluna>
                                    <Coluna tamanho={{width: 150, backgroundColor: '#DCE6F1', color: 'red'}}>PRAZO DE PAGAMENTO</Coluna>
                                </Linha>
                                <Linha>
                                    <Coluna tamanho={{width: 150 }}></Coluna>
                                    <Coluna tamanho={{flexGrow: 1 }}></Coluna>
                                    <Coluna tamanho={{width: 150 }}></Coluna>
                                </Linha>
                            </Tabela>
                        </View>
                        <View style={styles.rodape} fixed>
                            <Text>DCP Pinturas Técnicas</Text>
                            <Text style={[{color: 'black'}]}>Soluções Inovadoras, Eficientes e Confiáveis Para a Construção Civil</Text>
                        </View>
                    </View>
                </Page>
                <Page style={styles.page}>
                    <View style={styles.body}>
                        <View style={[styles.sessao]} fixed>
                            <Text style={styles.cabecalho}>
                                www.dcppinturastecnicas.com.br
                            </Text>
                        </View>
                        <View style={[styles.sessao]}>
                            <Text style={[styles.titulo_azul]}>
                                7. OBSERVAÇÕES
                            </Text>
                        </View>
                        <View style={[styles.sessao]}>
                            <Tabela>
                                <Linha>
                                    <Coluna tamanho={{width: 30}}>1</Coluna>
                                    <Coluna tamanho={{maxWidth: '93%'}}>
                                        Qualquer desmobilização solicitada pela Contratante e ou posterior mobilização da equipe, que
                                        não estavam previstas inicialmente no contrato será cobrado o valor de R$ 4.800,00 pela equipe e
                                        equipamentos disponibilizados
                                    </Coluna>
                                </Linha>
                                <Linha>
                                    <Coluna tamanho={{width: 30}}>2</Coluna>
                                    <Coluna tamanho={{maxWidth: '93%'}}>
                                        Para cada dia de chuva ou de umidade do ar acima de 80% a aplicação de tintas se torna
                                        inviável, serão então acrescidos 2 dias no cronograma final. O prazo de execução poderá
                                        aumentar caso as condições climáticas não favoreçam a secagem da tinta intumescente para
                                        posterior aplicação do acabamento.
                                    </Coluna>
                                </Linha>
                                <Linha>
                                    <Coluna tamanho={{width: 30}}>3</Coluna>
                                    <Coluna tamanho={{maxWidth: '93%'}}>
                                        A garantia não é aplicável e ou cessará nos casos de danos causados à superfície aplicada da
                                        pintura devido à falta de manutenção, manutenção inadequada, por movimentação
                                        inadequada de cargas e objetos, por modificações ou intervenções realizadas por vossa empresa
                                        ou terceiros sem a autorização formal da DCP Pinturas Técnicas, lascamentos provocados por
                                        qualquer outro tipo de ação externa não prevista que possa danificar o revestimento.
                                    </Coluna>
                                </Linha>
                                <Linha>
                                    <Coluna tamanho={{width: 30}}>4</Coluna>
                                    <Coluna tamanho={{maxWidth: '93%'}}>
                                        Será de responsabilidade da contratante se por ventura existir a necessidade de jateamento
                                        abrasivo das estruturas ao grau Sa 2 ½ e aplicar primer epóxi compatível com o intumescente com
                                        espessura apropriada para o sistema. O não cumprimento destas etapas gerará queda de
                                        performance e perda de garantia do sistema.
                                    </Coluna>
                                </Linha>
                                <Linha>
                                    <Coluna tamanho={{width: 30}}>5</Coluna>
                                    <Coluna tamanho={{color: 'red', maxWidth: '93%'}}>
                                        Cotação realizada por projetos enviados por e-mail, sendo necessário uma confirmação em campo.
                                    </Coluna>
                                </Linha>
                            </Tabela>
                        </View>
                        <View style={[styles.sessao]}>
                            <Text style={[styles.titulo_azul]}>
                                8. OBSERVAÇÕES GERAIS
                            </Text>
                        </View>
                        <View style={[styles.sessao]}>
                           <Tabela tamanho={70}>
                               <Linha>
                                   <Coluna tamanho={{flexGrow: 1, maxWidth: '100%', backgroundColor: '#95B3D7'}}>PRAZOS</Coluna>
                               </Linha>
                               <Linha>
                                   <Coluna tamanho={{width: '50%' }}>Mobilização / Início da Obra</Coluna>
                                   <Coluna tamanho={{width: '50%' }}>Duração da Obra</Coluna>
                               </Linha>
                               <Linha>
                                   <Coluna tamanho={{width: '50%' }}>De acordo ao planejamento</Coluna>
                                   <Coluna tamanho={{width: '50%' }}>De acordo ao planejamento</Coluna>
                               </Linha>
                           </Tabela>
                        </View>
                        <View style={[styles.sessao]}>
                           <Tabela tamanho={200}>
                               <Linha>
                                   <Coluna tamanho={{width: 230, backgroundColor: '#95B3D7'}}>RESPONSABILIDADES / AMBIENTE DE TRABALHO</Coluna>
                                   <Coluna tamanho={{width: 100, backgroundColor: '#95B3D7'}}>CLIENTE</Coluna>
                                   <Coluna tamanho={{flexGrow: 1, backgroundColor: '#95B3D7'}}>DCP PINTURAS TÉCNICAS</Coluna>
                               </Linha>
                               <Linha>
                                    <Coluna tamanho={{width: 230}}>Água, Energia elétrica, Iluminação</Coluna>
                                   <Coluna tamanho={{width: 100 }}>X</Coluna>
                                   <Coluna tamanho={{flexGrow: 1}}></Coluna>
                               </Linha>
                               <Linha>
                                    <Coluna tamanho={{width: 230}}>Sanitários, vestiários e refeitório</Coluna>
                                   <Coluna tamanho={{width: 100 }}>X</Coluna>
                                   <Coluna tamanho={{flexGrow: 1}}></Coluna>
                               </Linha>
                               <Linha>
                                    <Coluna tamanho={{width: 230}}>Proteção na área de trabalho</Coluna>
                                   <Coluna tamanho={{width: 100}}>X</Coluna>
                                   <Coluna tamanho={{flexGrow: 1}}></Coluna>
                               </Linha>
                               <Linha>
                                    <Coluna tamanho={{width: 230,}}>Limpeza Fina das áreas de execução</Coluna>
                                   <Coluna tamanho={{width: 100}}>X</Coluna>
                                   <Coluna tamanho={{flexGrow: 1}}></Coluna>
                               </Linha>
                           </Tabela>
                        </View>
                        <View style={styles.rodape} fixed>
                            <Text>DCP Pinturas Técnicas</Text>
                            <Text style={[{color: 'black'}]}>Soluções Inovadoras, Eficientes e Confiáveis Para a Construção Civil</Text>
                        </View>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    )
}

export default ArquivoOrcamento;
            