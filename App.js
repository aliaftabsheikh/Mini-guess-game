import { StatusBar } from "expo-status-bar";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {useFonts} from "expo-font"
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from './screens/GameScreen';
import { useState } from "react";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";
import AppLoading from "expo-app-loading";

export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRound, setGuessRound] = useState(0);

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  if(!fontsLoaded){
    return <AppLoading/>
  }

  const pickedNumberHandler = (pickNumber)=>{
    setUserNumber(pickNumber);
    setGameIsOver(false);
  }
  
  const gameOverHandler = (numberOfRounds)=>{
    setGameIsOver(true);
    setGuessRound(numberOfRounds);
  }


  const startNewGameHandler= ()=>{
    setUserNumber(null);
    setGuessRound(0)
  }   


  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;
  
  if(userNumber){
    screen = (
    <GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>
    );
  }

  if(gameIsOver && userNumber){
    screen = <GameOverScreen userNumber={userNumber} roundsNumber={guessRound} onStartNewGame={startNewGameHandler}/>;
  }

  return (
    <>
    <StatusBar style="light"/>
      <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
        <ImageBackground source={require('./assets/Images/background.png')} resizeMode="cover" style={styles.rootScreen} imageStyle={styles.backGroundImage}>
         <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backGroundImage:{
    opacity: 0.25,
  }
});
