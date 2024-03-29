/* eslint-disable react/prop-types */
import KanbanLeadsCard from "../KanbanLeadsCards";
import { Container, ListButtons, ListMenu, MenuButtons, NewContainer, Modal, ModalContent, CloseButton, MessageDeleteModal, ModalDeleteListButtons, ListOptionsInModal, CardsContainer } from "./styles";
import Tooltip from '@mui/material/Tooltip';
import { useDrop } from "react-dnd";
import KanbanContext from "../../contexts/kanbanContext";
import { useContext, useState, useRef, useEffect } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DriveFileMoveOutlinedIcon from '@mui/icons-material/DriveFileMoveOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ClearIcon from '@mui/icons-material/Clear';
import { toast } from "react-toastify";
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';

function LeadsList({ data, listIndex }) {

  const { moveCardToEmptyList, moveCardToEmptyListInDb, leadsList, moveAllCardsToList, moveAllCardsToListInDb, deleteListAndLeads, deleteListAndCardsInDb, moveAllCardsAndDeleteList, moveAllCardsAndDeleteListInDb, archiveAllCards, archiveAllCardsInDb } = useContext(KanbanContext);
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const [showListOptions, setShowListOptions] = useState(false);
  const [modalDeleteListIsVisible, setModalDeleteListIsVisible] = useState(false);
  const [showListOptionsInModal, setShowListOptionsInModal] = useState(false);

  console.log(listIndex, data.cards.length)

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [, dropRef] = useDrop({
    accept: 'CARD',
    drop(item) {
      const draggedIndex = item.cardIndex;
      const draggedList = item.listIndex;
      const targetListIndex = listIndex;
      const draggedListId = item.listId;
      const listId = data.id;
      const draggedID = item.cardID;

      if (draggedList === targetListIndex && draggedListId === listId) {
        return;
      }

      const list = leadsList[targetListIndex];
      const cardsOfList = [...list.cards];

      if (cardsOfList.length > 0) {
        return;
      }

      moveCardToEmptyList(draggedIndex, draggedList, targetListIndex, draggedID, data.title);
      moveCardToEmptyListInDb(draggedIndex, draggedList, targetListIndex);
      item.listIndex = targetListIndex;
    },

  })

  const handleMenu = () => {
    setOpenMenu(!openMenu);
    if (showListOptions) {
      setShowListOptions(false);
    }
  }

  const handleClickOutside = (event) => {
    if (buttonRef.current && buttonRef.current.contains(event.target)) {
      return;
    }
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenMenu(false);
      setShowListOptions(false);
    }
  };

  const openModalDeleteList = () => {
    if (listIndex === 0) {
      toast.warning('A lista "Em aberto" não pode ser deletada');
      return;
    }
    setModalDeleteListIsVisible(true);
    handleMenu();
  }

  return (
    <NewContainer>
      <Container ref={dropRef}>
        <header>
          <Tooltip title={data.title}>
            <h2>{data.title}</h2>
          </Tooltip>
          <MoreVertIcon onClick={() => handleMenu()} ref={buttonRef} />
        </header>

        <CardsContainer>
          {data.cards.map((card, index) =>
            <KanbanLeadsCard
              key={index}
              data={card}
              cardIndex={index}
              listIndex={listIndex}
              listId={data.id}
              listName={data.title}
            />)
          }
        </CardsContainer>

      </Container>
      <ListMenu isvisible={openMenu} ref={menuRef}>
        {
          data.cards.length > 0 &&
          <>
            <MenuButtons onClick={() => setShowListOptions(!showListOptions)}>
              <DriveFileMoveOutlinedIcon />
              <span>Mover todos os leads</span>
            </MenuButtons>

            <MenuButtons onClick={() => {
              archiveAllCards(listIndex);
              archiveAllCardsInDb(listIndex);
              setTimeout(() => {
                handleMenu();
              }, 500);
            }}>
              <ArchiveOutlinedIcon />
              <span>Arquivar leads</span>
            </MenuButtons>
          </>
        }

        {showListOptions && leadsList.map((lista, index) => (
          index !== listIndex ? (
            <ListButtons
              key={index}
              onClick={() => {
                moveAllCardsToList(listIndex, index);
                moveAllCardsToListInDb(listIndex, index);
                handleMenu();
              }}
            >
              <ArrowForwardIcon />
              <Tooltip title={lista.title}>
                <span>{lista.title}</span>
              </Tooltip>
            </ListButtons>
          ) : null
        ))}

        <MenuButtons onClick={() => openModalDeleteList()}>
          <DeleteOutlineIcon />
          <span>Deletar lista</span>
        </MenuButtons>
      </ListMenu>

      <Modal onClick={(e) => e.stopPropagation()} isvisible={modalDeleteListIsVisible}>
        <ModalContent width={400} height={200}>

          <CloseButton
            onClick={(e) => {
              e.stopPropagation();
              setModalDeleteListIsVisible(false)
            }
            }>
            <ClearIcon />
          </CloseButton>

          <MessageDeleteModal>
            <h2>{`Pretende deletar a lista: "${data.title}" ?`}</h2>
            <span>Escolha a opção abaixo conforme sua preferência</span>
          </MessageDeleteModal>

          {
            data.cards.length > 0 &&
            <ModalDeleteListButtons
              background="#4339F2"
              onClick={() => setShowListOptionsInModal(!showListOptionsInModal)}
            >
              <span>Mover todos os leads e deletar lista</span>
            </ModalDeleteListButtons>
          }

          <ListOptionsInModal isvisible={showListOptionsInModal}>
            {showListOptionsInModal && leadsList.map((lista, index) => (
              index !== listIndex ? (
                <ListButtons
                  key={index}
                  onClick={() => {
                    moveAllCardsAndDeleteList(listIndex, index);
                    moveAllCardsAndDeleteListInDb(listIndex, index);
                    setTimeout(() => {
                      setModalDeleteListIsVisible(false);
                    }, 200);
                  }}
                >
                  <ArrowForwardIcon />
                  <Tooltip title={lista.title}>
                    <span>{lista.title}</span>
                  </Tooltip>
                </ListButtons>
              ) : null
            ))}
          </ListOptionsInModal>


          <ModalDeleteListButtons
            background="#ff4d4d"
            onClick={() => {
              deleteListAndLeads(listIndex);
              deleteListAndCardsInDb(listIndex);
              setTimeout(() => {
                setModalDeleteListIsVisible(false);
              }, 200);
            }}
          >
            <span>Deletar lista e também os leads</span>
          </ModalDeleteListButtons>

        </ModalContent>
      </Modal>
    </NewContainer>
  )
}

export default LeadsList;