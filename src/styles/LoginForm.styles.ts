import styled from "styled-components";

export const FormContainer = styled.div`
    background: #1e1e1e;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    max-width: 500px;
    width: 100%;
    padding: 20px;
    margin: 20px auto;

    @media (max-width: 768px) {
        max-width: 400px;
    }
`;

export const Title = styled.h2`
    color: #fff;
    font-size: 24px;
    margin-bottom: 16px;
`;

export const Input = styled.input`
    padding: 12px;
    border-radius: 5px;
    border: 1px solid #444;
    background: #2a2a2a;
    color: white;
    font-size: 16px;
    outline: none;
    width: 100%;

    &::placeholder {
        color: #aaa;
    }
`;

export const Button = styled.button`
    padding: 12px 20px;
    border-radius: 5px;
    border: none;
    background: #0070f3;
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s;
    min-width: 150px;
    display: block;
    margin: 0 auto;
    width: auto;

    &:hover {
        background: #0051b3;
    }
`;

export const ErrorText = styled.p`
    color: #f44336;
    font-size: 12px;
    margin-top: 8px;
    text-align: center;
`;