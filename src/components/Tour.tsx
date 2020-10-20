import React from 'react'
import ReactTour from 'reactour'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

interface Props {
    isTouring: boolean;
    setShouldTour: (boolean) => undefined;
    startTour: () => undefined;
    stopTour: () => undefined;
}

const Tour = (props: Props) => {

    const history = useHistory()

    const tourSteps = [
        {
            selector: '.App',
            style: {
               
            },
            content: ({ goTo, inDOM }) => (
                <StyledLargeModal>
                    <ModalHeader>Welcome</ModalHeader>
                    <ModalContent>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid doloribus nesciunt placeat reprehenderit cum, culpa tenetur nihil nam vel rem?
                        </p>
                    </ModalContent>
                    <div className="tour-button-container">
                        <button>Skip Tour</button>
                        <button className="primary" onClick={goTo(2)}>Start Tour</button>
                    </div>
                </StyledLargeModal>
            ),
            action: (node) => {
                console.log('rendered step 0')
                // history.push('/')
            }
        }, {
            selector: '.App',
            content: ({ goTo, inDOM }) => (
                <div>
                    step 1
                </div>
            )
        }
    ]

    async function closeTour() {
        await props.stopTour();
        await props.setShouldTour(false)
    }

    return (
        <ReactTour 
            steps={tourSteps} 
            isOpen={props.isTouring}
            onRequestClose={closeTour}
            rounded={5}
            className='tour-base'
        />
    )
}

export default Tour

const ModalBase = styled.div`
    background: #FFF;
    border-radius: 5px;
    margin: 0 auto;
    display: flex;
    flex-flow: column nowrap;
    line-height: 1.4em;

    .tour-base {
        width: calc(100% - 60px);
        max-width: 468px;
        height: auto;
        min-width: 400px;
        min-height: 400px;
    }


    .tour-button-container {
        display: flex;
        justify-content: space-between;
        button {
            padding: 10px 15px;
            border-radius: 5px;
            border: 0;
            background: transparent;
            color: #bbb;
            font-size: 16px;
            flex: 1 50%;
            margin: 0 5px;
            border: 2px solid #bbb;

            &.primary {
                background: #56aade;
                color: #FFF;
                border-color: #56aade;
            }

            &:hover {
                opacity: 0.8;
            }
        }
    }

`

const ModalHeader = styled.h4`
    text-align: center;
    font-weight: bold;
    font-size: 1.5em;
    color: #444;
    margin: 10px 0;
`

const ModalContent = styled.div`
    flex: 1;
    padding: 20px 0;
`

const StyledLargeModal = styled(ModalBase)`
    width: 100%;

    height: 100%;
    background: #FFF;
`