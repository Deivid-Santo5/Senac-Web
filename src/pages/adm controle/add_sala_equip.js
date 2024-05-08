import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebaseconfig';
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { Modal, Button } from 'react-bootstrap';
import './styles.css';


function Gerenciamento() {
    // State para armazenar os dados das salas
    const [Sala, setSala] = useState([]);
    // State para armazenar os dados dos equipamentos
    const [Equipamentos, setEquipamentos] = useState([]);
    // State para o modal
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [itemName, setItemName] = useState('');
    const [itemType, setItemType] = useState(''); // 'room' ou 'equipamento'
    const [itemId, setItemId] = useState(''); // ID do item

    // Função para buscar salas e equipamentos do Firestore
    const fetchItems = async () => {
        // Buscar salas
        const SalaSnapshot = await getDocs(collection(db, 'Sala'));
        const SalaData = [];
        SalaSnapshot.forEach((doc) => {
            SalaData.push({ ...doc.data(), id: doc.id });
        });
        setSala(SalaData);

        // Buscar equipamentos
        const EquipamentosSnapshot = await getDocs(collection(db, 'Equipamentos'));
        const EquipamentosData = [];
        EquipamentosSnapshot.forEach((doc) => {
            EquipamentosData.push({ ...doc.data(), id: doc.id });
        });
        setEquipamentos(EquipamentosData);
    };

    // Função para adicionar ou editar sala ou equipamento
    const handleAddOrEditItem = async () => {
        const collectionName = itemType === 'room' ? 'Sala' : 'Equipamentos';

        if (isEditing) {
            // Editar item existente
            const itemDoc = doc(db, collectionName, currentItem.id);
            await updateDoc(itemDoc, { name: itemName });
        } else {
            // Adicionar novo item
            const newItemData = {
                name: itemName,
            };

            // Verifica se um ID foi fornecido pelo usuário
            if (itemId) {
                const itemDoc = doc(db, collectionName, itemId);
                // Verifica se o item já existe
                const itemExists = (await getDoc(itemDoc)).exists();
                if (itemExists) {
                    alert('Item com este ID já existe. Por favor, insira outro ID.');
                    return;
                }
                // Cria um novo item com o ID fornecido
                await setDoc(itemDoc, newItemData);
            } else {
                // Adiciona um novo item com um ID gerado automaticamente
                await addDoc(collection(db, collectionName), newItemData);
            }
        }

        setShowModal(false);
        fetchItems(); // Atualiza a lista de itens após adicionar ou editar
    };

    // Função para excluir sala ou equipamento
    const handleDeleteItem = async (itemType, itemId) => {
        const collectionName = itemType === 'room' ? 'Sala' : 'Equipamentos';
        const itemDoc = doc(db, collectionName, itemId);
        await deleteDoc(itemDoc);
        fetchItems(); // Atualiza a lista de itens após excluir
    };

    // Função para abrir o modal para adicionar ou editar sala ou equipamento
    const handleOpenModal = (itemType, item = null) => {
        setItemType(itemType);
        if (item) {
            setIsEditing(true);
            setItemName(item.name);
            setCurrentItem(item);
            setItemId(item.id);
        } else {
            setIsEditing(false);
            setItemName('');
            setItemId(''); // Limpa o campo de ID ao adicionar um novo item
            setCurrentItem(null);
        }
        setShowModal(true);
    };

    // Fecha o modal
    const handleCloseModal = () => {
        setShowModal(false);
        setItemName('');
        setItemId('');
        setCurrentItem(null);
        setIsEditing(false);
    };

    // Busca salas e equipamentos do Firestore quando o componente monta
    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div>
            <h2>Gerenciar Salas e Equipamentos</h2>

            {/* Botão para abrir o modal para adicionar uma nova sala */}
            <Button variant="primary" onClick={() => handleOpenModal('room')}>
                Adicionar Nova Sala
            </Button>

            {/* Botão para abrir o modal para adicionar um novo equipamento */}
            <Button variant="primary" onClick={() => handleOpenModal('equipamento')}>
                Adicionar Novo Equipamento
            </Button>

            {/* Lista de salas */}
            <h3>Salas</h3>
            <ul>
                {Sala.map((room) => (
                    <li key={room.id}>
                        <strong>{room.name}</strong>
                        <Button variant="secondary" onClick={() => handleOpenModal('room', room)}>
                            Editar
                        </Button>
                        <Button variant="danger" onClick={() => handleDeleteItem('room', room.id)}>
                            Excluir
                        </Button>
                    </li>
                ))}
            </ul>

            {/* Lista de equipamentos */}
            <h3>Equipamentos</h3>
            <ul>
                {Equipamentos.map((equip) => (
                    <li key={equip.id}>
                        <strong>{equip.name}</strong>
                        <Button variant="secondary" onClick={() => handleOpenModal('equipamento', equip)}>
                            Editar
                        </Button>
                        <Button variant="danger" onClick={() => handleDeleteItem('equipamento', equip.id)}>
                            Excluir
                        </Button>
                    </li>
                ))}
            </ul>

            {/* Modal para adicionar ou editar sala ou equipamento */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton className='modal-header'>
                    <Modal.Title>{isEditing ? 'Editar' : 'Adicionar'}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-body '>
                    <form>
                        <div className="container-gerenciamento">
                            <label>ID:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={itemId}
                                onChange={(e) => setItemId(e.target.value)}
                                required={!isEditing} // Requer ID somente ao adicionar um novo item
                            />
                        </div>
                        <div className="container-gerenciamento">
                            <label>Nome:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                                required
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer className='modal-footer'>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={handleAddOrEditItem}>
                        {isEditing ? 'Salvar Alterações' : 'Adicionar'}
                    </Button>
                
            </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Gerenciamento;
