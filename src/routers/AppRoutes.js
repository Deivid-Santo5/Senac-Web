import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from '../pages/login/index';
import Register from '../pages/register/index';
import Home from '../pages/home/home';
import Sala from '../pages/salas/salas';
import Equipamento from '../pages/equipamentos/equipamentos';
import Gerenciamento from '../pages/adm controle/add_sala_equip';
import RelatorioSala from '../pages/relatorios/relatoriosala/relatoriosala';
import RelatorioEquipamento from '../pages/relatorios/RelatorioEquipamento/relatorioequipamento';
import Relatorios from '../pages/relatorios/relatorios';
import Developer from '../pages/info_developer/developer';





export default function AppRoutes() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/Register" element={<Register />}></Route>
                <Route path="/Home" element={<Home />}></Route>
                <Route path="/Sala" element={<Sala />}></Route>
                <Route path="/Equipamento" element={<Equipamento />}></Route>
                <Route path="/Gerenciamento" element={<Gerenciamento />}></Route>
                <Route path="/RelatorioSala" element={<RelatorioSala />}></Route>
                <Route path="/RelatorioEquipamento" element={<RelatorioEquipamento />}></Route>
                <Route path="/Relatorios" element={<Relatorios />}></Route>
                <Route path="/Developer" element={<Developer />}></Route>


            </Routes>


        </BrowserRouter>
    )
}