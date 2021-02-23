/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
import React, {useState, useEffect} from 'react'
import "./SelecaoFiltroSimples.css"

function SelecaoFiltroSimples(props) {

    const [itensDisplay, setItensDisplay] = useState(<></>);

    useEffect(() => {
        setItensDisplay(props.camposMontar.map((item) => (
            <div key={item.key} className="form-check item-selecao-filtro-simples position-initial">
                <input
                    className="form-check-input"
                    type="radio"
                    name="tipoFiltro"
                    id={"radio-"+item.nome}
                    value={item.valor}
                    onChange={(event) => props.retornarFiltro(event.target.value)}
                    defaultChecked={item.selecionado ?? false}
                />
                <label className="form-check-label">{item.nome}</label>
            </div>
        )))
    }, [props.camposMontar.lenght])

    return (
        <div id="containerSelecaoFiltroSimples">
            <div className="item-selecao-filtro-simples">
                <label className="form-check-inline-filter">Filtrar por:</label>
            </div>
            {itensDisplay}
        </div>
    )
}

export default SelecaoFiltroSimples