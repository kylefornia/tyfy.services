import React, { useEffect } from 'react'
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
    // const globeContext = useGlobe()

    function getControls(): HTMLElement {
        return document.querySelectorAll<HTMLElement>('[data-tour-elem="controls"]')[0];
    }

    function getBadge(): HTMLElement {
        return document.querySelectorAll<HTMLElement>('[data-tour-elem="badge"]')[0];
    }

    function getModal(): HTMLElement {
        return document.querySelectorAll<HTMLElement>('.tour-base')[0];
    }



    // const controls = document.querySelectorAll('[data-tour-elem="controls"]');
    // let controls = document.querySelectorAll<HTMLElement>('[data-tour-elem="controls"]')[0];


    const tourSteps = [
        {
            selector: '.App',
            position: 'center',
            content: ({ goTo, inDOM }) => (
                <StyledLargeModal data-step="1">
                    {/* <ModalHeader>Welcome</ModalHeader> */}
                    <i className='logo-big ri-empathize-line'></i>
                    <ModalContent>
                        <p>This is dedicated to all the Frontliners, Health Workers, Law Enforcement, Donors, Volunteers, and everyone who are helping the world during these tough times.</p>
                        <p>
                            The project is open source and free to use without any charge. Let's show our appreciation for these brave heroes who are risking their lives everyday by sending them thank you notes to brighten up their day.
                        </p>
                    </ModalContent>
                    <div className="tour-button-container">
                        <button onClick={() => closeTour()}>Skip Tour</button>
                        <button className="primary" onClick={() => goTo(1)}>Start Tour</button>
                    </div>
                </StyledLargeModal>
            ),
            action: (node) => {
                getControls().style.display = 'none';
                getBadge().style.display = 'none';


                if (history.location !== '/')
                    history.push('/')
            }
        }, {
            selector: '[data-tour="step-1"]',
            content: ({ goTo, inDOM }) => (
                <StyledLargeModal>
                    <ModalHeader>Send Message</ModalHeader>
                    <ModalContent>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid doloribus nesciunt placeat reprehenderit cum, culpa tenetur nihil nam vel rem?
                        </p>
                    </ModalContent>
                </StyledLargeModal>
            ),
            action: (node) => {
                let controls = document.querySelectorAll<HTMLElement>('[data-tour-elem="controls"]')[0];

                getControls().style.display = 'flex';
                getBadge().style.display = 'block';


                if (history.location !== '/')
                    history.push('/')
            }
        }, {
            selector: '[data-tour="step-2"]',
            content: ({ goTo, inDOM }) => (
                <StyledLargeModal>
                    <ModalHeader>Cheer</ModalHeader>
                    <ModalContent>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid doloribus nesciunt placeat reprehenderit cum, culpa tenetur nihil nam vel rem?
                        </p>
                    </ModalContent>
                </StyledLargeModal>
            ),
            action: (node) => {
                if (history.location !== '/')
                    history.push('/')
            }
        }, {
            selector: '[data-tour="step-3"]',
            content: ({ goTo, inDOM }) => (
                <StyledLargeModal>
                    <ModalHeader>Receive Letters</ModalHeader>
                    <ModalContent>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid doloribus nesciunt placeat reprehenderit cum, culpa tenetur nihil nam vel rem?
                        </p>
                    </ModalContent>
                </StyledLargeModal>
            ),
            action: (node) => {
                if (history.location !== '/account')
                    history.push('/account')
            }
        },
    ]

    async function closeTour() {
        await props.stopTour();
        await props.setShouldTour(false)
    }

    return (
        <StyledReactTour
            steps={tourSteps}
            isOpen={props.isTouring}
            onRequestClose={closeTour}
            rounded={5}
            data-tour='tour'
            className='tour-base'
            maskClassName='tour-mask-style'
            closeWithMask={true}
        />
    )
}

export default Tour

const StyledReactTour = styled(ReactTour)`


    &.tour-base {
        /* --webkit-backdrop-filter: blur(10px); */
        box-shadow: 0px 5px 30px rgba(0,0,0,0.1);
        background-color: rgba(255, 255, 255, 0.9);
        
        @supports (backdrop-filter: blur(10px)) {
            background-color: rgba(255, 255, 255, 0.65);
            backdrop-filter: blur(10px);
        }
    }

    button[data-tour-elem="right-arrow"], 
    button[data-tour-elem="left-arrow"] {
        padding: 8px;
        box-sizing: content-box;
    }


    .logo-big {
        font-size: 48px;
        color: #56aade;
        text-align: center;
        margin: 10px 0;
        display: block;
    }

    animation: appear 1s linear forwards;
    @keyframes appear {
        0% { opacity: 0;}
        99% { opacity: 0;}
        100% { opacity: 1;}
    }

`

const ModalBase = styled.div`
    /* background: rgba(255,255,255,0.5); */
    border-radius: 10px;
    margin: 0 auto;
    display: flex;
    flex-flow: column nowrap;
    line-height: 1.4em;

    *:focus {
        outline: 0;
    }

    .tour-base {
        width: calc(100vw - 60px);
        max-width: 600px;
        height: auto;
        min-width: 400px;
        min-height: 400px;

        background: rgba(255,255,255, 0.5);
    }


    .tour-button-container {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        button {
            padding: 8px 12px;
            border-radius: 30px;
            border: 0;
            background: transparent;
            color: #888;
            font-size: 16px;
            width: calc(50% - 5px);
            /* margin: 0 5px; */
            border: 2px solid #888;

            &.primary {
                background: #56aade;
                color: #FFF;
                border-color: #56aade;
                box-shadow: 0px 0px 10px rgba(86, 170, 222, 0.5);
            }

            &:hover {
                opacity: 0.8;
                cursor: pointer;
            }

            &:nth-of-type(1) {
                margin-left: 0;
            }

            &:nth-of-type(2) {
                margin-right: 0;
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
    font-family: 'Merriweather', 'Times New Roman', Times, serif;

`

const ModalContent = styled.div`
    flex: 1;
    padding: 20px 0;
    color: #666;

    p {
        margin-bottom: 10px;
    }
`

const StyledLargeModal = styled(ModalBase)`
    width: 100%;

    height: 100%;
`