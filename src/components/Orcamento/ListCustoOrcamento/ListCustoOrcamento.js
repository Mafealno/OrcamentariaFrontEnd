import React, { useState, useEffect } from 'react';
import "./ListCustoOrcamento.css";
import ModalCustoOrcamento from "./ModalCustoOrcamento/ModalCustoOrcamento";
import ToastControl from "../../ToastControl/ToastControl";
import ItemCustoOrcamento from "./ItemCustoOrcamento/ItemCustoOrcamento";
import TotaisCustoOrcamento from "./TotaisCustoOrcamento/TotaisCustoOrcamento"
import * as orcamentoActions from "../../../store/actions/orcamento";
import { connect } from "react-redux";

function ListCustoOrcamento(props) {
    const [showModalCustoOrcamento, setShowModalCustoOrcamento] = useState(false)
    const [listItemCustoOrcamentoDisplay, setListItemCustoOrcamentoDisplay] = useState([])
    const [showToast, setShowToast] = useState(false);
    const [configToast, setConfigToast] = useState({
        estiloToast: "",
        estiloToastHeader: "",
        estiloToastBody: "",
        delayToast: 0,
        autoHideToast: false,
        hideToastHeader: true,
        conteudoHeader: "",
        conteudoBody: "",
        closeToast: {},
      });
      
      useEffect(() => {
        montarItemDisplay();
      }, [props.listCustoOrcamento]);

      const exibirTost = (tipo, mensagem) => {
        switch (tipo) {
          case "sucesso":
            setConfigToast({
              estiloToast: "",
              estiloToastHeader: "estiloToastSucesso",
              estiloToastBody: "estiloToastSucesso",
              delayToast: 3000,
              autoHideToast: true,
              hideToastHeader: false,
              conteudoHeader: "",
              conteudoBody: mensagem,
              closeToast: () => setShowToast(),
            });
            setShowToast(true);
            break;
          case "erro":
            setConfigToast({
              estiloToast: "",
              estiloToastHeader: "estiloToastErro",
              estiloToastBody: "estiloToastErro",
              delayToast: 6000,
              autoHideToast: true,
              hideToastHeader: false,
              conteudoHeader: "",
              conteudoBody: mensagem,
              closeToast: () => setShowToast(),
            });
            setShowToast(true);
            break;
          default:
            break;
        }
      };

      const montarItemDisplay = () => {
        if (props.listCustoOrcamento.length > 0) {
          setListItemCustoOrcamentoDisplay(
            props.listCustoOrcamento.map((elemento) => (
              <ItemCustoOrcamento
                custoOrcamento={elemento}
                salvarCustoOrcamento={(
                  custoOrcamento,
                  fazerAposCadastrar
                ) =>
                  salvarCustoOrcamento(
                    custoOrcamento,
                    fazerAposCadastrar
                  )
                }
                deletarCustoOrcamento={(custoOrcamentoId) =>
                  deletarCustoOrcamento(custoOrcamentoId)
                }
              />
            ))
          );
        } else {
          setListItemCustoOrcamentoDisplay([]);
        }
      };

      const salvarCustoOrcamento = (
        custoOrcamento,
        fazerAposCadastrar
      ) => {
        fetch(props.linkBackEnd + "/custoOrcamento/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(custoOrcamento),
        })
          .then((response) => response.json())
          .then((data) => {
            
            props.recarregarTotaisOrcamento(props.linkBackEnd, props.orcamentoSelecionado.ORCAMENTO_ID);

            custoOrcamento.CUSTO_ORCAMENTO_ID = data.CUSTO_ORCAMENTO_ID

            props.adicionarItemCustoOrcamento(
              props.listCustoOrcamento,
              custoOrcamento
            );
    
            const msg = "Cadastro efetuado com sucesso";
            exibirTost("sucesso", msg);
    
            if (fazerAposCadastrar) {
              fazerAposCadastrar(data);
            }
          })
          .catch(() => {
            const msg = "Erro ao efetuar cadastro";
            exibirTost("erro", msg);
          });
      };

      const deletarCustoOrcamento = (custoOrcamentoId) => {
        fetch(
          props.linkBackEnd +
            "/custoOrcamento/deletar?custoOrcamentoId=" +
            custoOrcamentoId,
          {
            method: "DELETE",
          }
        ).then((data) => {
          if (data.ok) {
            props.removerItemCustoOrcamento(
              props.listCustoOrcamento,
              custoOrcamentoId
            );

            props.recarregarTotaisOrcamento(props.linkBackEnd, props.orcamentoSelecionado.ORCAMENTO_ID);
    
            const msg = "Exclusão efetuada com sucesso";
            exibirTost("sucesso", msg);
          } else {
            const msg = "Erro ao efetuar exclusão";
            exibirTost("erro", msg);
          }
        });
      };

    return (
        <>
        <div id="containerListCustoOrcamento">
            <div className="form form-orcamento">
                <div id="btn-add-custo-orcamento">
                    <button
                        type="button"
                        className="btn"
                        onClick={() => setShowModalCustoOrcamento(true)}
                    >
                        Adicionar custo
                    </button>
                </div>
                <div id="list-custo-orcamento">
                    {listItemCustoOrcamentoDisplay}
                </div>
                <div id="totais-mao-obra-orcamento">
                    <TotaisCustoOrcamento />
                </div>
            </div>
        </div>
        <div>
        <ModalCustoOrcamento
          show={showModalCustoOrcamento}
          onHide={() => setShowModalCustoOrcamento(false)}
          salvarCustoOrcamento={(
            custoOrcamento,
            fazerAposCadastrar
          ) =>
          salvarCustoOrcamento(custoOrcamento, fazerAposCadastrar)
          }
          deletarCustoOrcamento={(custoOrcamentoId) =>
            deletarCustoOrcamento(custoOrcamentoId)
          }
        />
      </div>
        <div>
        <ToastControl
          showToast={showToast}
          closeToast={configToast.closeToast}
          delayToast={configToast.delayToast}
          autoHideToast={configToast.autoHideToast}
          estiloToastHeader={configToast.estiloToastHeader}
          estiloToastBody={configToast.estiloToastBody}
          hideToastHeader={configToast.hideToastHeader}
          conteudoHeader={configToast.conteudoHeader}
          conteudoBody={configToast.conteudoBody}
        />
      </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    linkBackEnd: state.backEnd.link,
    listCustoOrcamento: state.orcamento.listCustoOrcamento,
    orcamentoSelecionado: state.orcamento.orcamentoSelecionado
  });
  
  const mapDispatchToProps = (dispatch) => ({
    adicionarItemCustoOrcamento: (
      listCustoOrcamento,
      ItemCustoOrcamento
    ) =>
      dispatch(
        orcamentoActions.adicionarItemCustoOrcamento(
            listCustoOrcamento,
            ItemCustoOrcamento
        )
      ),
    removerItemCustoOrcamento: (
        listCustoOrcamento,
        custoOrcamentoId
    ) =>
      dispatch(
        orcamentoActions.removerItemCustoOrcamento(
          listCustoOrcamento,
          custoOrcamentoId
        )
      ),
    recarregarItensCustoOrcamento: (linkBackEnd, orcamentoId) =>
      dispatch(
        orcamentoActions.recarregarItensCustoOrcamento(
          linkBackEnd,
          orcamentoId
        )
      ),
      recarregarTotaisOrcamento : (linkBackEnd, orcamentoId) =>
        dispatch(orcamentoActions.recarregarTotaisOrcamento(linkBackEnd, orcamentoId)),

  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ListCustoOrcamento);