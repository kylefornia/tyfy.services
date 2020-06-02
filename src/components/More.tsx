import React from 'react'
import styled from 'styled-components';
import SectionHeader from './SectionHeader';


interface Props {

}

const More = (props: Props) => {
  return (
    <StyledMoreContainer>
      <SectionHeader title="About" />
      <StyledDeveloperContainer>
        <h4>Kyle Vanderfox</h4>
        <span className="creds">Developer</span>
        <p className="message">This is dedicated to all the Frontliners, Health Workers, Law Enforcement, Donors, Volunteers, and everyone who are helping the world during these tough times.
        The project is open source and free to use without any charge. Let's show our appreciation for these brave heroes who are risking their lives everyday by sending them thank you notes to brighten up their day.
        </p>
        <div className="links">
          <span className="links-title">Links</span>
          <ul>
            <li><i className="ri-github-fill" /><a href="https://github.com/kylefornia/tyfy.services">GitHub</a></li>
            <li><i className="ri-linkedin-fill" /><a href="https://www.linkedin.com/in/kyle-abughanem/">LinkedIn</a></li>
            <li><i className="ri-mail-fill" /><a href="mailto:kyle.abughanem@gmail.com">Email</a></li>

          </ul>
        </div>
      </StyledDeveloperContainer>
    </StyledMoreContainer>
  )
}

export default More

const StyledMoreContainer = styled.div`
  flex: 1;
  width: calc(100% - 20px);
  margin: 0 auto;
  max-width: 468px;
`;

const StyledDeveloperContainer = styled.div`
  border-radius: 3px;
  box-shadow: 0px 3px 10px rgba(0,0,0,0.1);
  background: #FFF;
  padding: 40px 20px;


  h4 {
    color: #444;
    font-weight: bold;
    font-size: 20px;
    text-align: center;
    font-family: 'Merriweather', 'Times New Roman', Times, serif;
  }

  .creds {
    text-align: center;
    margin: 0 auto;
    display: block;
    margin-bottom: 30px;
    margin-top: 5px;
    color: #888;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
  }

  .message {
    text-align: justify;
    line-height: 24px;
    font-size: 16px;
    color: #555;
  }

  .links {

    margin-top: 30px;

    .links-title {
      font-weight: bold;
      margin-bottom: 10px;
      color: #444;

    }

    ul {
      margin-top: 10px;

       li {
         margin-bottom: 5px;
         vertical-align: baseline;
         line-height: 20px;

         i {
          margin-right: 5px;
          color: #444;
          }

          a, a:visited {
            color: #666;
          }
       }
    }
  }
`;