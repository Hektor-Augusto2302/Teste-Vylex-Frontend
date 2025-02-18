"use client"

import { FooterContainer,  FooterText } from "@/styles/Footer.styles";

export default function Footer() {
    return (
        <FooterContainer>
            <FooterText>© {new Date().getFullYear()} Gestão de Tarefas. Todos os direitos reservados.</FooterText>
        </FooterContainer>
    );
}