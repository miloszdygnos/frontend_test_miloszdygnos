import { useState, useEffect } from 'react'
import "./styles/main.scss"
import ContentBlock from './components/ContentBlock';
function App() {

  const [option, setOption] = useState("")
  const [data, setData] = useState([]);
  const [renderArray, setRenderArray] = useState([]);

  const handleChange = (e) => {
    setOption(e.target.value);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("./src/localApi/Content.json");
      if(!response.ok) {
        console.error(`There is a problem with response!`)
      }
      const result  = await response.json();
      const { content } = result;
      setData(content)
    }
    fetchData();
  }, [])

  const arraySort = () => {
    setRenderArray(prev => prev.sort((a, b) => a.value.localeCompare(b.value)))
  }
  const generateRandomIndex = (arrayLenght = data.length) => {
    const number = Math.floor(Math.random() * arrayLenght)
    return number;
  }

  const handleAdding = () => {
    if(option === "first") {
        const contain = renderArray.some(item => item.value.includes(data[0].value))
        if(!contain) {
          setRenderArray(prev => [...prev, data[0]])
          arraySort()
        } return;
    }
    if(option === "second") {
      const contain = renderArray.some(item => item.value.includes(data[1].value))
      if(!contain) {
        setRenderArray(prev => [...prev, data[1]])
        arraySort()
      } return;
    }
    if (option === "third") {
      const availableData = data.filter(element => !renderArray.some(item => item.value.includes(element.value)));
      if (availableData.length === 0) {
        console.log(`No more unique elements to display!`)
        return;
      }
      const generatedElement = availableData[generateRandomIndex(availableData.length)];
      setRenderArray(prev => [...prev, generatedElement]);
      arraySort();

    }
  

  }
  const handleArrayChange = () => {
    if(option === "first") {
      setRenderArray([data[0]])
      
    }
    if(option === "second") {
      setRenderArray([data[1]])
    }
    if (option === "third") {
      const actualElement = renderArray[renderArray.length - 1];
      const availableData = data.filter(d => d.value !== actualElement.value);
    
      if (availableData.length === 0) {
        return;
      }
    
      const newElement = availableData[generateRandomIndex(availableData.length)];
      setRenderArray([newElement]);
    }
    
  }
  return (
    <>
      <header>
        <div className='logo'></div>
        <h1>Zadanie <span>rekrutacyjne</span></h1>
      </header>
      <main>
        <h1>Nagłówek H1</h1>
        <div className='container'>
          <section>
            <h3>blok pierwszy</h3>
            <div>
              <input type="radio" name="choice" id='first' value="first" label="true" onChange={handleChange}/>
              <label htmlFor="first">Opcja pierwsza</label>
            </div>
            <div>
              <input type="radio" name="choice" id='second' value="second" label="true"  onChange={handleChange}/>

              <label htmlFor="second">Opcja druga</label>
            </div>
            
            <div>
              <input type="radio" name="choice" id='third' value="third" label="true" onChange={handleChange}/>

              <label htmlFor="third">Opcja losowa</label>
            </div>
            

          </section>
          <section>
            <h3>blok drugi</h3>
            <div>
              <button onClick={handleArrayChange}>zastąp</button>
              <button onClick={handleAdding}>doklej</button>
            </div>
          </section>
          <section>
            <h3>blok z długa nazwą która sama sie przytnie ...</h3>
            {/* here is place for generated text */}
            {renderArray.map((element, index) => {
              return(
                <ContentBlock key={index} content={element.value}/>
              )
            })}
          </section>
        </div>

      </main>
      <footer>
        <div className='footerElement'>
           <div className='cssBox'>
            <span>css</span>
            <span>is</span>
            <span>awesome</span>
          </div>
        </div>
       <div className='footerElement'>
        <h3>nabthat</h3>
       </div> 
        <div  className='footerElement'>
          <button><span>pokaż</span></button>
        </div>
      </footer>
    </>
  )
}

export default App
