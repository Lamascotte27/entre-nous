import type * as React from 'react';
/** Logo « entre ; nous ». */
export interface LogoProps { variante?: 'logo' | 'signe'; hauteur?: number; inverse?: boolean; mono?: boolean; fixe?: boolean; className?: string; style?: React.CSSProperties }
export declare function Logo(props: LogoProps): React.ReactElement;
/** Les mascottes Point et Virgule. */
export interface PointVirguleProps { pose?: 'ensemble' | 'question' | 'attente' | 'revelation' | 'calin' | 'fete' | 'endormi' | 'point' | 'virgule'; taille?: number; autocollant?: boolean; decoratif?: boolean; label?: string; className?: string }
export declare function PointVirgule(props: PointVirguleProps): React.ReactElement;
export interface BoutonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variante?: 'principal' | 'secondaire' | 'discret' }
export declare function Bouton(props: BoutonProps): React.ReactElement;
export interface CarteQuestionProps { question: string; date?: string; serie?: number; maReponse?: string; saReponse?: string; prenom?: string; monPrenom?: string; className?: string }
export declare function CarteQuestion(props: CarteQuestionProps): React.ReactElement;
export interface BilletProps { auteur?: 'toi' | 'autre'; prenom?: string; scelle?: boolean; children?: React.ReactNode; className?: string }
export declare function Billet(props: BilletProps): React.ReactElement;
export interface CachetProps { taille?: number; label?: string }
export declare function Cachet(props: CachetProps): React.ReactElement;
export interface SerieBadgeProps { jours: number }
export declare function SerieBadge(props: SerieBadgeProps): React.ReactElement;
export interface CarteOffreProps { titre: string; detail?: string; prix: string; mention?: string; etiquette?: string; choisie?: boolean; onClick?: () => void }
export declare function CarteOffre(props: CarteOffreProps): React.ReactElement;
export interface NotificationPushProps { texte: string; titre?: string; heure?: string }
export declare function NotificationPush(props: NotificationPushProps): React.ReactElement;
declare global { interface Window { EntreNous: { Logo: typeof Logo; PointVirgule: typeof PointVirgule; Bouton: typeof Bouton; CarteQuestion: typeof CarteQuestion; Billet: typeof Billet; Cachet: typeof Cachet; SerieBadge: typeof SerieBadge; CarteOffre: typeof CarteOffre; NotificationPush: typeof NotificationPush } } }
