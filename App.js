import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import jsonData from './cartes.json';

export default function App() {
  const [cartes, setCartes] = useState(jsonData);
  const [carteVisible, setCarteVisible] = useState(false);
  const [carteTirée, setCarteTirée] = useState(null);
  const [réponseVisible, setRéponseVisible] = useState(false);
  const [cartesDéjàTirées, setCartesDéjàTirées] = useState([]);

  const tirerCarte = (type) => {
    const deck = cartes[type];
    const cartesRestantes = deck.filter(
      (carte) => !cartesDéjàTirées.some((tirée) => tirée.id === carte.id)
    );

    console.log(`Cartes restantes (${type}) :`, cartesRestantes.length);
    
    if (cartesRestantes.length === 0) {
      alert("Mince, toutes les cartes ont été tirées. \nVeuillez recommencer !");
      return; 
    }
    
    const randomIndex = Math.floor(Math.random() * cartesRestantes.length);
    const carteChoisie = { ...cartesRestantes[randomIndex], category: type };
    
    setCarteTirée(carteChoisie);
    setCarteVisible(true);
    setRéponseVisible(false);
    setCartesDéjàTirées((prev) => [...prev, carteChoisie]);
  };

  const recommencer = () => {
    setCarteVisible(false);
    setCarteTirée(null);
    setRéponseVisible(false);
    setCartesDéjàTirées([]);
  };

  const révélerRéponse = () => {
    setRéponseVisible(true);
  };

  const logos = {
    enigmes: require('./assets/logo_enigme.png'),
    evenements: require('./assets/logo_event.png'),
    master: require('./assets/logo_original.png'),
  };

  useEffect(() => {
    if (carteTirée) {
      console.log('Carte tirée :', carteTirée);
    }
  }, [carteTirée]);

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo_typo.png')} style={styles.logo} />
      {!carteVisible && (
        <>
          <Text style={styles.slogan}>Puisse le vent tourner en votre faveur</Text>
          <View style={styles.decks}>
            <TouchableOpacity onPress={() => tirerCarte('enigmes')} style={styles.deck}>
              <Image source={require('./assets/dos_enigme.png')} style={styles.deckImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => tirerCarte('evenements')} style={styles.deck}>
              <Image source={require('./assets/dos_event.png')} style={styles.deckImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => tirerCarte('master')} style={styles.deck}>
              <Image source={require('./assets/dos_master.png')} style={styles.deckImage} />
            </TouchableOpacity>
          </View>
        </>
      )}
  
      {carteVisible && (
        <View style={styles.carteContainer}>
          {logos[carteTirée.category] ? (
            <Image source={logos[carteTirée.category]} style={styles.logoCarte} />
          ) : (
            <Text>Logo non trouvé pour {carteTirée.category}</Text>
          )}
          {carteTirée.type === 'master' ? (
            <>
              <Text style={styles.titreCarte}>{carteTirée.titre}</Text>
              <Text style={styles.description}>{carteTirée.description}</Text>
              <Text style={styles.themeCarte}> Thème : {carteTirée.theme}</Text>
            </>
          ) : (
            <>
              <Text style={styles.titreCarte}>{carteTirée.titre}</Text>
              <Text style={styles.description}>{carteTirée.énigme || carteTirée.description}</Text>
              {carteTirée.type === 'choix' && carteTirée.options?.map((option, index) => (
                <Text key={index} style={styles.option}>
                  {`\u2022`} {option}
                </Text>
              ))}
             {['reflexion', 'choix', 'indices', 'charade'].includes(carteTirée.type) && (
              <TouchableOpacity onPress={révélerRéponse} style={styles.bouton}>
                <Text style={styles.boutonTexte}>Révéler la réponse</Text>
              </TouchableOpacity>
            )}
              {réponseVisible && (
                <>
                  <Text style={styles.réponse}>{carteTirée.réponse || carteTirée.action}</Text>
                  {carteTirée.explication && (
                    <Text style={styles.explication}>{carteTirée.explication}</Text>
                  )}
                </>
              )}
            </>
          )}
        </View>
      )}
  
      {carteVisible && (
        <TouchableOpacity onPress={() => setCarteVisible(false)} style={styles.retourButton}>
          <Text style={styles.retourTexte}>Retour</Text>
        </TouchableOpacity>
      )}
  
      {!carteVisible && cartesDéjàTirées.length > 0 && (
        <TouchableOpacity onPress={recommencer} style={styles.recommencerButton}>
          <Text style={styles.recommencerTexte}>Recommencer</Text>
        </TouchableOpacity>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 ELITZ. Tous droits réservés.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F4E7',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: '#C8B444',
    alignItems: 'center',
    justifyContent: 'center',
  },

  footerText: {
    color: '#273679',
    fontSize: 14,
    fontStyle: 'italic',
  },
  
  slogan: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontFamily: 'serif',
    color: '#7C3E43',
    marginBottom: 20,
    textAlign: 'center',
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  decks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 10,
  },
  deck: {
    padding: 5,
    borderRadius: 10,
    flexShrink: 1,
    width: '30%',
    alignItems: 'center',
  },
  deckImage: {
    width: '100%',
    height: 200,
    maxWidth: 120,
    resizeMode: 'contain',
  },
  carteContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    width: 320,
    maxWidth: '90%',
    minWidth: 300,
  },
  logoCarte: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  themeCarte: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#7C3E43',
    marginBottom: 5,
    textAlign: 'center',
  },
  titreCarte: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C8B444',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
    color: '#273679',
    flexShrink: 1,
    width: '100%',
    overflow: 'hidden',
  },
  instruction: {
    fontSize: 12,
    color: '#273679',
    marginTop: 10,
    textAlign: 'center',
  },
  option: {
    fontSize: 15,
    color: '#273679',
    marginVertical: 8,
    textAlign: 'left',
    paddingLeft: 10,
  },
  bouton: {
    marginTop: 10,
    marginBottom: 5,
    padding: 10,
    backgroundColor: '#A9B3E8',
    borderRadius: 5,
  },
  boutonTexte: {
    color: '#F7F4E7',
    fontWeight: 'bold',
  },
  retourButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#7C3E43',
    borderRadius: 5,
    alignSelf: 'center',
  },
  retourTexte: {
    color: '#F7F4E7',
    fontWeight: 'bold',
  },
  réponse: {
    marginTop: 20,
    marginBottom: 5,
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#7C3E43',
    textAlign: 'center',
    flexShrink: 1,
    width: '100%',
    overflow: 'hidden',
  },
  explication: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 15,
    fontStyle: 'italic',
    color: '#7C3E43',
    textAlign: 'center',
    flexShrink: 1,
    width: '100%',
    overflow: 'hidden',
  },
  recommencerButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#A9B3E8',
    borderRadius: 5,
    alignSelf: 'center',
  },
  recommencerTexte: {
    color: '#F7F4E7',
    fontWeight: 'bold',
  },
});