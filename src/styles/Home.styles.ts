import styled from "styled-components";

export const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
    width: 100%;
    flex-wrap: wrap;

    @media (max-width: 1000px) {
        flex-direction: column;
        gap: 10px;
    }

    @media (max-width: 768px) {
        gap: 8px;
    }
`;

export const CardContainer = styled.div`
    background-color: #1e1e1e;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;
    width: 100%;

    &:hover {
        transform: translateY(-5px);
    }

    h3 {
        color: #fff;
        font-size: 1.25rem;
        margin-bottom: 8px;

        @media (max-width: 768px) {
            font-size: 1.1rem;
        }
    }

    p {
        color: #bbb;
        font-size: 0.9rem;
        margin-bottom: 12px;

        @media (max-width: 768px) {
            font-size: 0.85rem;
        }
    }
`;

const ButtonBase = styled.button`
    flex-grow: 1;
    text-align: center;
    padding: 10px;
    font-size: 16px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;

    @media (max-width: 768px) {
        font-size: 14px;
        padding: 8px;
    }

    @media (max-width: 600px) {
        padding: 12px;
    }
`;

export const ButtonConcluido = styled(ButtonBase)`
    background-color: #28a745;
    color: white;

    &:hover {
        background-color: #218838;
    }
`;

export const ButtonAtualizar = styled(ButtonBase)`
    background-color: #ffc107;
    color: #1e1e1e;

    &:hover {
        background-color: #e0a800;
    }
`;

export const ButtonExcluir = styled(ButtonBase)`
    background-color: #dc3545;
    color: white;

    &:hover {
        background-color: #c82333;
    }
`;