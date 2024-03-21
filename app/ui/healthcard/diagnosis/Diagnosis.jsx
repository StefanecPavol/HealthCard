"use client"
import styles from "./diagnosis.module.css";
import { useState } from "react";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

const Diagnosis = ({ diagnosis }) => {
    const [activeDiagnosis, setActiveDiagnosis] = useState(null);

    const handleShow = (id) => {
        setActiveDiagnosis(activeDiagnosis === id ? null : id);
    }

    const diagnosesArray = diagnosis.split(',').map(diagnosis => diagnosis.trim()).filter(diagnosis => diagnosis !== '');

    const detailsArray = [
        {   
            id: 'diabetes', 
            diagnosis: 'Diabetes', 
            details: 'Diabetes je chronický stav spojený s vyššími hladinami cukru v krvi. Vzniká zlyhaním inzulínu, hormónu produkovaného pankreasom, pri riadení cukru pre energiu. Diabetes môže viesť k rôznym komplikáciám, vrátane problémov s očami, obličkami a srdcom. Riadenie diabetesu zahŕňa monitorovanie hladiny cukru v krvi, pravidelnú fyzickú aktivitu a diétne ovládanie. Existujú dva hlavné typy diabetesu - Typ 1, ktorý vyžaduje liečbu inzulínom, a Typ 2, často riadený životným štýlom. Včasná diagnóza a správne riadenie sú kľúčové pre udržanie zdravého života s diabetom.' 
        },
        {   
            id: 'hypertrofia',
            diagnosis: 'Hypertrofia', 
            details: 'Hypertrofia sa vzťahuje na zväčšenie alebo nadmerný rast orgánu alebo tkaniva v dôsledku zväčšenia jeho buniek. V kontexte lekárskych stavov je hypertrofia často spojená s svalmi srdca. Kardiálna hypertrofia môže byť výsledkom rôznych faktorov, vrátane vysokého krvného tlaku alebo porúch chlopne srdca. Hoci je na začiatku kompenzačným mechanizmom, dlhodobá hypertrofia môže viesť k dysfunkcii srdca. Pravidelné lekárske monitorovanie a riešenie základných príčin sú nevyhnutné. Na základe závažnosti a konkrétnych podmienok spojených s hypertrofiou sa môžu odporúčať úpravy životného štýlu, lieky alebo chirurgické zákroky.' 
        },
        {   
            id: 'Arytmia', 
            diagnosis: 'Arytmia', 
            details: 'Arytmia je stav charakterizovaný nepravidelným srdcovým rytmom, čo môže mať vážne následky na zdravie. Môže sa prejaviť ako príliš rýchle, príliš pomalé alebo nepravidelné srdcové tepy. Arytmia môže mať rôzne príčiny vrátane srdcových chorôb, hormonálnych nerovnováh alebo nadmerného stresu. Je dôležité vyhľadať lekársku pomoc a riadiť sa odporúčaniami ošetrujúceho lekára.' 
        },
        {
            id: 'zlyhanie-srdca',
            diagnosis: 'Zlyhanie srdca',
            details: 'Zlyhanie srdca je stav, kedy srdce nedokáže pumpovať dostatočné množstvo krvi do tela. Môže byť spôsobené rôznymi faktormi, vrátane hypertenzie a ochorenia srdcových chlopni.'
        },
        {
            id: 'kardiomyopatia',
            diagnosis: 'Kardiomyopatia',
            details: 'Kardiomyopatia je stav, kde srdcový sval oslabuje alebo sa zväčšuje. Môže byť dôsledkom genetických faktorov, infekcií alebo iných podmienok.'
        },
        {
            id: 'endokarditida',
            diagnosis: 'Endokarditída',
            details: 'Endokarditída je zápal vnútorného obalu srdca, čo môže byť spôsobené bakteriálnou alebo infekčnou léziou.'
        },
        {
            id: 'perikarditida',
            diagnosis: 'Perikarditída',
            details: 'Perikarditída je zápal vonkajšieho obalu srdca, známy ako perikard. Môže byť spôsobená infekciou, traumatickým poranením alebo autoimunitnou reakciou.'
        },
        {
            id: 'hypertenzia',
            diagnosis: 'Hypertenzia',
            details: 'Hypertenzia je stav, kedy krvný tlak v tepnách je vyšší ako bežný. Nezvládnutá hypertenzia môže zvýšiť riziko srdcových chorôb, ako je infarkt myokardu a zlyhanie srdca.'
        },
        {
            id: 'ventrikularna-fibrilacia',
            diagnosis: 'Ventrikulárna fibrilácia',
            details: 'Ventrikulárna fibrilácia je vážna arytmia, kedy srdcové komory bijú nepravidelne a rýchlo. Môže to viesť k zástave srdca a nútiť okamžitú lekársku pomoc.'
        },
        {
            id: 'ventrikularna-tachykardia',
            diagnosis: 'Ventrikulárna tachykardia',
            details: 'Ventrikulárna tachykardia je arytmia charakterizovaná rýchlym rytmom srdca, ktorý začína v srdcových komorách. Môže byť potenciálne nebezpečná a vyžaduje lekársku intervenciu.'
        },
        {
            id: 'perikardiocenteza',
            diagnosis: 'Perikardiocentéza',
            details: 'Perikardiocentéza je procedúra, pri ktorej sa odstráni nadmerná tekutina z perikardu, čo môže byť spôsobené perikarditídou alebo inými stavmi.'
        },
    ];
  
    return (
        <div className={styles.diagnosisContainer}>
            {diagnosesArray.map((diagnosis, index) => {
                const detail = detailsArray.find(detail => detail.diagnosis.toLowerCase() === diagnosis.toLowerCase());
                return (
                    <div key={index} className={styles.diagnoseContainer}>
                        <div className={styles.diagnoseHeader}>
                            <h2 className={styles.infoH2}>{diagnosis}</h2>
                            {detail && (
                                <FaRegArrowAltCircleRight className={`${styles.btn} ${activeDiagnosis === detail.id && styles.btnActive}`} size={30} onClick={() => handleShow(detail.id)} />
                            )}
                        </div>
                        {activeDiagnosis === detail?.id && (
                            <div className={styles.diagnoseDesc}>
                                <p>{detail ? detail.details : 'Details not found.'}</p>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Diagnosis;
