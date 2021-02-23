export const listTrrf = [ 'naoSelecionado', '30', '60', '90', '120', '150', '180']
export const listGrupo = ['naoSelecionado', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
export const listOcupacaoUso = ['naoSelecionado', 'RESIDENCIAL', 'SERVIÇOS DE HOSPEDAGEM', 
                                'COMERCIAL VAREJISTA', 'SERVIÇOS PROFISSIONAIS, PESSOAIS E TECNICOS',
                                'EDUCACIONAL E CULTURA FISICA', 'LOCAIS DE REUNIÃO DE PUBLICO', 'SERVIÇOS AUTOMOTIVOS',
                                'SERVIÇOS DE SAÚDE INSTITUCIONAIS', 'INDUSTRIAL', 'DEPÓSITOS'];
export const listDivisao = ['A naoSelecionado', 'B naoSelecionado', 'C naoSelecionado', 'D naoSelecionado', 'E naoSelecionado', 'F naoSelecionado', 
                            'G naoSelecionado', 'H naoSelecionado', 'I naoSelecionado', 'J naoSelecionado', 'A 1 - HABITAÇÕES UNIFAMILIARES', 'A 2 - HABITAÇÕES MULTIFAMILIARES', 
                            'A 3 - HABITAÇÕES COLETIVAS', 'B 1 - HOTÉIS E ASSEMELHADOS', 'B 2 - HOTÉIS RESIDENCIAIS', 
                            'C 1 - COMÉRCIO EM GERAL, DE PEQUENO PORTE', 'C 2 - COMÉRCIO DE GRANDE E MÉDIO PORTE', 
                            'C 3 - CENTROS COMERCIAIS', 'D 1 - LOCAIS PARA PRESTAÇÃO DE SERVIÇOS PROFISSIONAIS OU CONDUÇÃO DE NEGÓCIOS', 
                            'D 2 - AGÊNCIAS BANCÁRIAS', 'D 3 - SERVIÇOS DE REPARAÇÃO (EXCETO OS CLASSIFICADOS EM G E I)', 'E 1 - ESCOLAS EM GERAL', 
                            'E 2 - ESCOLAS ESPECIAIS', 'E 3 - ESPAÇO PARA CULTURA FÍSICA', 'E 4 - CENTROS DE TREINAMENTO PROFISSIONAL', 
                            'E 5 - PRÉ-ESCOLAS', 'E 6 - ESCOLAS PARA PORTADORES DE DEFICIÊNCIAS', 'F 1 - LOCAIS ONDE HÁ OBJETOS DE VALOR INESTIMÁVEL', 
                            'F 2 - TEMPLOS E AUDITÓRIOS', 'F 3 - CENTROS ESPORTIVOS', 'F 4 - ESTAÇÕES E TERMINAIS DE PASSAGEIROS', 
                            'F 5 - LOCAIS DE PRODUÇÃO E APRESENTAÇÃO DE ARTES CÊNICAS', 'F 6 - CLUBES SOCIAIS', 'F 7 - CONSTRUÇÕES PROVISÓRIAS', 
                            'F 8 - LOCAIS PARA REFEIÇÕES', 'G 1 - GARAGENS SEM ACESSO DE PÚBLICO E SEM ABASTECIMENTO', 
                            'G 2 - GARAGENS COM ACESSO DE PÚBLICO E SEM ABASTECIMENTO', 'G 3 - LOCAIS DOTADOS DE ABASTECIMENTO DE COMBUSTÍVEL', 
                            'G 4 - SERVIÇOS DE CONSERVAÇÃO, MANUTENÇÃO E REPAROS', 'G 5 - SERVIÇOS DE MANUTENÇÃO EM VEÍCULOS E GRANDE PORTE E RETIFICADORAS EM GERAL', 
                            'H 1 - HOSPITAIS VETERINÁRIOS E ASSEMELHADOS', 'H 2 - LOCAIS ONDE PESSOAS REQUEREM CUIDADOS ESPECIAIS POR LIMITAÇÕES FÍSICAS OU MENTAIS', 
                            'H 3 - HOSPITAIS E ASSEMELHADOS', 'H 4 - PRÉDIOS E INSTALAÇÕES VINCULADAS ÀS FORÇAS ARMADAS, POLÍCIAS CÍVIL E MILITAR', 
                            'H 5 - LOCAIS ONDE A LIBERDADE DAS PESSOAS SOFRE RESTRIÇÕES ', 'I 1 - LOCAIS ONDE AS ATIVIDADES EXERCIDAS E IS MATERIAIS UTILIZADOS OU DESPOSITADOS APRESENTEM MÉDIO POTENCIAL DE INCÊNDIO', 
                            'I 2 - LOCAIS ONDE AS ATIVIDADES EXERCIDAS E IS MATERIAIS UTILIZADOS E/OU DESPOSITADOS APRESENTEM MÉDIO POTENCIAL DE INCÊNDIO', 'J 1 - DEPÓSITOS DE BAIXO RISCO DE INCÊNDIO', 
                            'J 2 - DEPÓSITOS DE MÉDIO E ALTO RISCO DE INCÊNDIO']
export const listReferencia = ['naoSelecionado', 'VIGA', 'COLUNA', 'TUBO', 'OUTROS'];


export const  calcularValoresItemIntumescente = (itemItumescente, perfil, espessuraCartaCobertura) => {

    let valoresCalculados = {
        Hp: 0.0,
        WD: 0.0,
        HpA: 0.0,
        Area: 0.0,
        TotalLitros: 0.0
    }

    const HpAux = ((2 * perfil.VALOR_D) + (itemItumescente.NUMERO_FACES * perfil.VALOR_BF)) / 1000;
    const WDAux = 39.70008 / (perfil.VALOR_KG_M * 2.2);
    const HpAAux = HpAux / (perfil.VALOR_KG_M / 7850);
    const AreaAux = itemItumescente.VALOR_COMPRIMENTO * itemItumescente.QTDE * HpAux;

    let TotalLitrosAux = 0.0;
    if(espessuraCartaCobertura)
    {
        TotalLitrosAux = 1.4 * espessuraCartaCobertura * AreaAux;
    }

    valoresCalculados.Hp = parseFloat(HpAux.toFixed(2));
    valoresCalculados.WD = parseFloat(WDAux.toFixed(2));
    valoresCalculados.HpA = parseFloat(HpAAux.toFixed());
    valoresCalculados.Area = parseFloat(AreaAux.toFixed(2));
    valoresCalculados.TotalLitros = parseFloat(TotalLitrosAux.toFixed(2));

    return valoresCalculados;
}

export const  calcularTotaisIntumescente = (listItensIntumescente, valoresIntumescente, percentualPerda) => {
    let valoresCalculados = {
        AreaTotal: 0.0,
        QtdeLitros: 0.0,
        QtdeBaldes: 0.0,
        QtdeBaldesPerda: 0.0,
        ValorTotal: 0.0
    }

    const AreaTotalAux = listItensIntumescente.reduce((acumulador, itemAtual) => acumulador += itemAtual.AREA, 0);
    const QtdeLitrosAux = listItensIntumescente.reduce((acumulador, itemAtual) => acumulador += itemAtual.QTDE_LITROS, 0);
    const QtdeBaldesAux = QtdeLitrosAux / 20;
    const QtdeBaldesPerdaAux = (QtdeBaldesAux * (percentualPerda / 100)) + QtdeBaldesAux;
    const ValorTotalAux = AreaTotalAux * valoresIntumescente;

    valoresCalculados.AreaTotal = AreaTotalAux.toFixed(2);
    valoresCalculados.QtdeLitros = QtdeLitrosAux.toFixed(2);
    valoresCalculados.QtdeBaldes = QtdeBaldesAux.toFixed(2);
    valoresCalculados.QtdeBaldesPerda = QtdeBaldesPerdaAux.toFixed(2);
    valoresCalculados.ValorTotal = ValorTotalAux.toFixed(2);

    return valoresCalculados;

}