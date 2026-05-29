// Type definitions for CV Builder

export interface Link {
    nombre: string;
    url: string;
}

export interface Education {
    institucion: string;
    inicio: string;
    fin: string;
    descripcion: string;
}

export interface Experience {
    puesto: string;
    empresa: string;
    inicio: string;
    fin: string;
    descripcion: string;
}

export interface Language {
    idioma: string;
    nivel: string;
}

export interface CVData {
    nombre: string;
    fecha: string;
    enlaces: Link[];
    descripcion: string;
    educacion: Education[];
    experiencia: Experience[];
    idiomas: Language[];
    carnet: string;
}

export type LanguageType = 'es' | 'en';

export interface Translations {
    [key: string]: {
        [key: string]: string;
    };
}