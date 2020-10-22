import React, { useEffect } from 'react'
import ReactTour from 'reactour'
import styled from 'styled-components'
import { useHistory, Link } from 'react-router-dom'
import { useGlobe } from '../contexts/GlobeContext'

interface Props {
    isTouring: boolean;
    setShouldTour: (boolean) => undefined;
    startTour: () => undefined;
    stopTour: () => undefined;
}

const Tour = (props: Props) => {

    const history = useHistory()
    const globeContext = useGlobe()

    function getControls(): HTMLElement {
        return document.querySelectorAll<HTMLElement>('[data-tour-elem="controls"]')[0];
    }

    function getBadge(): HTMLElement {
        return document.querySelectorAll<HTMLElement>('[data-tour-elem="badge"]')[0];
    }

    function getModal(): HTMLElement {
        return document.querySelectorAll<HTMLElement>('.tour-base')[0];
    }

    const tourSteps = [
        {
            selector: '.App',
            content: ({ goTo, inDOM }) => (
                <StyledLargeModal data-step="1">
                    <StyledIconContainer>
                        <i className="ri-empathize-line" />
                    </StyledIconContainer>
                    {/* <i className='logo-big ri-empathize-line'></i> */}
                    <ModalContent>
                        <p>This is dedicated to all the <b>Frontliners</b>, <b>Health Workers</b>, <b>Law Enforcement</b>, <b>Donors</b>, <b>Volunteers</b>, and others who selflessly and tirelessly serve to keep us safe during these tough times.</p>
                        <p>
                            Let's show our appreciation for these brave heroes who are risking their lives everyday by sending them thank you notes to brighten up their day.
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

                // globeContext.unsuspendGlobe();
            }
        }, {
            selector: '[data-tour="step-1"]',
            content: ({ goTo, inDOM }) => (
                <StyledLargeModal>
                    <StyledIconContainer>
                        <i className="ri-file-text-line" />
                    </StyledIconContainer>
                    <ModalHeader>Send a Note</ModalHeader>
                    <ModalContent>
                        <p>
                            Write a short message to a randomly assigned recipient.
                        </p>
                        <p>
                            Keep it short, simple, and <b>sincere</b>.
                        </p>
                    </ModalContent>
                </StyledLargeModal>
            ),
            action: (node) => {

                getControls().style.display = 'flex';
                getBadge().style.display = 'block';

                // globeContext.suspendGlobe()

                if (history.location !== '/')
                    history.push('/')
            }
        }, {
            selector: '[data-tour="step-2"]',
            content: ({ goTo, inDOM }) => (
                <StyledLargeModal>
                    <StyledIconContainer>
                        <i className="ri-user-heart-line" />
                    </StyledIconContainer>
                    <ModalHeader>Cheer</ModalHeader>
                    <ModalContent>
                        <p>
                            Cheer together with everyone and watch the live counter go up.
                        </p>
                        <p>
                            <b>Press the 👏 button</b> and give it a try
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
                    <StyledIconContainer>
                        <i className="ri-account-circle-line" />
                    </StyledIconContainer>
                    <ModalHeader>Receive Letters</ModalHeader>
                    <ModalContent>
                        <p>
                            <Link to="/account"><b>Sign in</b></Link> with your social media accounts to start receiving letters
                        </p>
                    </ModalContent>
                </StyledLargeModal>
            ),
            action: (node) => {
                // globeContext.unsuspendGlobe()
            }
        }, {
            selector: '[data-tour="step-4"]',
            content: ({ goTo, inDOM }) => (
                <StyledLargeModal>
                    <StyledIconContainer>
                        <i className="ri-scan-2-line" />
                    </StyledIconContainer>
                    <ModalHeader>Live Feed</ModalHeader>
                    <ModalContent>
                        <p>
                            View all letters that have been sent around the world in real time.
                        </p>
                    </ModalContent>
                </StyledLargeModal>
            ),
            action: (node) => {
                // globeContext.unsuspendGlobe()
            }
        },
    ]

    async function closeTour() {
        await props.stopTour();
        await props.setShouldTour(false)
        globeContext.unsuspendGlobe()
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

    div[data-tour-elem="controls"] {
        justify-content: space-around;
        background: rgba(255, 255, 255, 0.5);
        padding: 10px;
        border-radius: 30px;
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
                background: #017AFF;
                color: #FFF;
                border-color: #017AFF;
                box-shadow: 0px 0px 10px #56aade;
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

    b {
        font-weight: 600;
        color: #444;
    }

    p {
        margin-bottom: 10px;
    }
`

const StyledLargeModal = styled(ModalBase)`
    width: 100%;

    height: 100%;
`

const StyledIconContainer = styled.div`
    background: rgba(255,255,255, 0.5);
    width: 80px; height: 80px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-bottom: 5px;


    i {
        color: #017AFF;
        font-size: 48px;
    }
`