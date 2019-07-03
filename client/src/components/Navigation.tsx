import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import SearchField from './SearchField'

import './Navigation.scss'

type Props = {
  name?: string,
  handleNameChange: any,
}

export default class Navigation extends Component<Props> {
  render() {
    const {name, handleNameChange} = this.props
    const logo = (
      <svg role="img" aria-label="Datasaurus Logo" width="170" height="29" viewBox="0 0 170 29" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd">
          <path className="logo-type" d="M39.042 20.75c.187.016.405.03.652.037.248.01.542.013.884.013 1.996 0 3.477-.503 4.44-1.51.965-1.007 1.448-2.398 1.448-4.173 0-1.86-.46-3.268-1.383-4.224-.92-.956-2.38-1.434-4.377-1.434-.273 0-.555.003-.845.012-.29.01-.562.03-.818.064V20.75zm11.545-5.633c0 1.536-.24 2.876-.717 4.02-.477 1.142-1.156 2.09-2.035 2.84-.88.752-1.95 1.315-3.213 1.69-1.263.376-2.68.563-4.25.563-.716 0-1.552-.03-2.508-.09s-1.894-.183-2.816-.37V6.49c.922-.17 1.882-.286 2.88-.346s1.856-.09 2.573-.09c1.52 0 2.898.17 4.135.512 1.238.342 2.3.88 3.187 1.613.888.733 1.57 1.672 2.048 2.815.478 1.144.717 2.518.717 4.122zm7.818 6.22c.375 0 .734-.008 1.075-.025.34-.017.614-.043.82-.077v-2.893c-.154-.034-.385-.068-.692-.102-.307-.034-.59-.05-.845-.05-.358 0-.695.02-1.01.063-.317.042-.594.124-.833.243-.24.12-.427.282-.563.486-.137.205-.205.46-.205.768 0 .598.2 1.012.602 1.242.4.23.95.346 1.65.346zm-.307-11.16c1.126 0 2.065.127 2.816.383.75.256 1.352.623 1.804 1.1.453.48.773 1.06.96 1.742.188.682.282 1.442.282 2.278v7.936c-.546.12-1.306.26-2.278.422-.973.163-2.15.244-3.533.244-.872 0-1.66-.077-2.37-.23-.707-.154-1.318-.406-1.83-.756s-.904-.806-1.177-1.37c-.273-.563-.41-1.254-.41-2.073 0-.785.158-1.45.474-1.997.316-.546.738-.98 1.267-1.306.53-.324 1.135-.56 1.818-.704.682-.145 1.39-.217 2.124-.217.495 0 .935.02 1.32.063.383.042.694.098.933.166v-.36c0-.648-.197-1.168-.59-1.56-.392-.393-1.075-.59-2.048-.59-.648 0-1.288.047-1.92.14-.63.095-1.177.227-1.638.398l-.486-3.072c.22-.068.5-.14.832-.218.332-.076.695-.145 1.088-.204.392-.06.806-.11 1.24-.154.436-.043.876-.064 1.32-.064zm8.69-2.996l3.814-.614v3.968h4.583v3.175h-4.583v4.735c0 .802.14 1.442.423 1.92.28.478.85.717 1.702.717.41 0 .832-.04 1.267-.116.436-.076.832-.183 1.19-.32l.538 2.97c-.46.188-.972.35-1.536.486-.563.137-1.254.205-2.073.205-1.04 0-1.903-.14-2.586-.422-.682-.282-1.23-.674-1.638-1.178-.41-.503-.697-1.113-.86-1.83-.16-.717-.242-1.51-.242-2.38V7.18zM83.316 21.34c.375 0 .734-.01 1.075-.026.343-.017.616-.043.82-.077v-2.893c-.153-.034-.384-.068-.69-.102-.308-.034-.59-.05-.846-.05-.358 0-.695.02-1.01.063-.317.042-.594.124-.833.243-.238.12-.425.282-.562.486-.137.205-.205.46-.205.768 0 .598.2 1.012.602 1.242.4.23.95.346 1.65.346zm-.307-11.162c1.125 0 2.064.128 2.815.384.75.256 1.352.623 1.805 1.1.452.48.772 1.06.96 1.742.187.682.28 1.442.28 2.278v7.936c-.545.12-1.304.26-2.277.422-.973.163-2.15.244-3.533.244-.87 0-1.66-.077-2.368-.23-.708-.154-1.318-.406-1.83-.756s-.905-.806-1.178-1.37c-.273-.563-.41-1.254-.41-2.073 0-.785.158-1.45.474-1.997.316-.546.738-.98 1.267-1.306.53-.324 1.135-.56 1.818-.704.682-.145 1.39-.217 2.125-.217.495 0 .934.02 1.318.063.384.042.695.098.934.166v-.36c0-.648-.196-1.168-.588-1.56-.393-.393-1.076-.59-2.048-.59-.65 0-1.29.047-1.92.14-.632.095-1.178.227-1.64.398l-.485-3.072c.22-.068.498-.14.83-.218.334-.076.696-.145 1.09-.204.39-.06.805-.11 1.24-.154.436-.043.875-.064 1.32-.064zM96.192 21.26c.7 0 1.194-.067 1.485-.204.29-.137.435-.4.435-.794 0-.307-.188-.576-.563-.806-.376-.23-.948-.49-1.716-.78-.597-.223-1.14-.453-1.625-.692-.488-.24-.9-.525-1.243-.858-.34-.332-.606-.73-.793-1.19-.188-.46-.282-1.015-.282-1.664 0-1.263.47-2.26 1.408-2.995.94-.734 2.227-1.1 3.866-1.1.82 0 1.604.072 2.355.217.752.145 1.35.303 1.793.473l-.666 2.97c-.444-.154-.926-.29-1.446-.41-.52-.12-1.104-.18-1.753-.18-1.194 0-1.792.334-1.792 1 0 .153.026.29.077.41.05.118.154.234.307.345.153.11.362.23.626.358.265.128.602.27 1.012.422.836.308 1.527.61 2.073.91.547.298.978.622 1.294.972.316.35.538.738.666 1.165.128.425.192.92.192 1.484 0 1.33-.5 2.338-1.498 3.02-.998.683-2.41 1.024-4.237 1.024-1.194 0-2.19-.102-2.982-.307-.794-.204-1.344-.374-1.65-.51l.64-3.098c.647.256 1.313.456 1.995.6.683.146 1.357.22 2.023.22zm13.696.078c.374 0 .733-.01 1.074-.026.34-.017.614-.043.82-.077v-2.893c-.154-.034-.385-.068-.692-.102-.307-.034-.59-.05-.845-.05-.358 0-.695.02-1.01.063-.317.042-.594.124-.833.243-.24.12-.427.282-.563.486-.136.205-.204.46-.204.768 0 .598.2 1.012.602 1.242.4.23.95.346 1.65.346zm-.308-11.162c1.126 0 2.065.128 2.816.384.75.256 1.352.623 1.804 1.1.453.48.773 1.06.96 1.742.188.682.282 1.442.282 2.278v7.936c-.546.12-1.306.26-2.278.422-.973.163-2.15.244-3.533.244-.87 0-1.66-.077-2.368-.23-.708-.154-1.32-.406-1.83-.756-.513-.35-.905-.806-1.178-1.37-.273-.563-.41-1.254-.41-2.073 0-.785.158-1.45.474-1.997.317-.546.74-.98 1.268-1.306.53-.324 1.135-.56 1.818-.704.682-.145 1.39-.217 2.124-.217.495 0 .935.02 1.32.063.383.042.694.098.933.166v-.36c0-.648-.196-1.168-.59-1.56-.39-.393-1.074-.59-2.047-.59-.648 0-1.288.047-1.92.14-.63.095-1.177.227-1.638.398l-.486-3.072c.22-.068.5-.14.832-.218.332-.076.695-.145 1.088-.204.392-.06.806-.11 1.24-.154.436-.043.876-.064 1.32-.064zm20.112 13.363c-.648.187-1.484.362-2.508.524-1.024.162-2.1.243-3.226.243-1.143 0-2.095-.153-2.854-.46-.76-.308-1.36-.74-1.805-1.293-.443-.555-.76-1.216-.946-1.984-.188-.768-.282-1.613-.282-2.535v-7.5h3.814v7.04c0 1.228.163 2.116.487 2.662.324.546.93.82 1.817.82.273 0 .564-.014.87-.04.308-.025.58-.055.82-.09V10.535h3.814V23.54zm12.1-9.626c-.342-.086-.743-.175-1.204-.27-.46-.093-.955-.14-1.484-.14-.24 0-.525.02-.858.064-.333.043-.585.09-.755.14V24h-3.815V11.25c.683-.238 1.49-.464 2.42-.677.93-.214 1.967-.32 3.11-.32.205 0 .452.013.742.038.29.027.58.06.87.104.29.042.58.093.87.153.29.06.54.132.744.218l-.64 3.15zm14.182 9.625c-.65.187-1.485.362-2.51.524-1.023.162-2.098.243-3.224.243-1.144 0-2.095-.153-2.855-.46-.76-.308-1.36-.74-1.805-1.293-.443-.555-.76-1.216-.947-1.984-.188-.768-.28-1.613-.28-2.535v-7.5h3.813v7.04c0 1.228.162 2.116.486 2.662.325.546.93.82 1.818.82.273 0 .563-.014.87-.04.308-.025.58-.055.82-.09V10.535h3.814V23.54zm7.45-2.28c.7 0 1.194-.067 1.484-.204.29-.137.436-.4.436-.794 0-.307-.188-.576-.564-.806-.375-.23-.947-.49-1.715-.78-.597-.223-1.14-.453-1.625-.692-.487-.24-.9-.525-1.242-.858-.34-.332-.606-.73-.794-1.19-.187-.46-.28-1.015-.28-1.664 0-1.263.468-2.26 1.407-2.995.938-.734 2.227-1.1 3.865-1.1.82 0 1.605.072 2.356.217.75.145 1.348.303 1.792.473l-.666 2.97c-.444-.154-.926-.29-1.446-.41-.52-.12-1.105-.18-1.754-.18-1.195 0-1.792.334-1.792 1 0 .153.026.29.077.41.05.118.153.234.307.345.154.11.363.23.627.358.264.128.6.27 1.01.422.837.308 1.528.61 2.074.91.546.298.977.622 1.293.972.316.35.537.738.665 1.165.128.425.192.92.192 1.484 0 1.33-.5 2.338-1.497 3.02-1 .683-2.41 1.024-4.237 1.024-1.195 0-2.19-.102-2.982-.307-.794-.204-1.344-.374-1.652-.51l.64-3.098c.65.256 1.315.456 1.997.6.683.146 1.357.22 2.023.22z" fill="#212121"/>
          <path className="logo-mark" d="M28.584 4.966l-.232-.167c-.265-.193-.633-.143-.836.114l-.765.974-2.12-.125-3.258-3.484c-.083-.088-.19-.15-.306-.176l-3.354-.797-.112-.89h10.984v4.55zm0 5.848v17.77H12.77l4.636-5.042.01-.01c.006-.01.86-.98 2.117-1.94.358-.275.718-.524 1.068-.74.406-.25 1.017-.63 1.724-1.172 2.77-2.117 4.864-5.088 6.26-8.866zM7.147 28.584H.417V23.34l.53 1.487c.057.157.175.286.33.354.152.067.327.07.48.005.297-.124.578-.25.85-.38.437.456 1.32 1.314 2.006 1.595 0 0 .593.29.35-.453-.2-.614-.507-1.49-.566-2.1.224-.134.446-.277.667-.423.47.47 1.247 1.196 1.865 1.448 0 0 .59.29.348-.452-.212-.65-.547-1.6-.576-2.208.41-.327.835-.682 1.288-1.07.465.448 1.096.987 1.612 1.2 0 0 .593.29.35-.455-.187-.57-.467-1.372-.55-1.97.03-.027.057-.053.088-.076.784-.684 1.675-1.462 2.723-2.355.303-.258.605-.5.9-.727 2.004-1.533 3.546-2.11 4.605-2.3-1.772 1.47-3.4 3.922-4.815 6.285-.58-.136-1.304-.438-1.83-.645-.728-.287-.474.324-.474.324.217.634.898 1.46 1.34 1.953l-.217.378c-.27.46-.54.896-.813 1.305-.578-.135-1.305-.44-1.833-.647-.728-.285-.474.325-.474.325.2.582.787 1.325 1.227 1.825-.206.265-.408.51-.6.74-.58-.132-1.32-.44-1.855-.653-.727-.285-.474.325-.474.325.182.528.685 1.19 1.103 1.677-.416.42-.677.647-.688.657-.08.078-.138.173-.168.277zM.417 18.247V.417H14.71L11.698 4.59l-.087-.28c-.075-.252-.308-.426-.573-.428L9.333 3.86c-.218-.002-.42.11-.53.296L.415 18.246zm3.815.557c-.44 1.06-2.276 3.907-2.587 2.566-.31-1.336.352-2.605.352-2.605 1.65-2.527 2.675-1.02 2.235.04zm11.196-7.29c-.333 1.782-3.543 2.437-4.92 3.76-1.174 1.13-2.686 3.148-3.422 1.757-.738-1.392 1.066-4.84 1.066-4.84 3.79-6.528 7.606-2.456 7.276-.675zm5.35-2.374c.15 2.107-1.154 2.167-1.835.66-.68-1.506-2.47-1.757-3.064-2.716-.594-.96.55-1.356.55-1.356 2.16-1.017 4.196 1.305 4.347 3.412z" fill="#4990E2"/>
        </g>
      </svg>
    )
    return (
      <div className="main-nav row bg-light pt-md-3">
        <div className="col-sm-12 col-md-4">
          <Link to="/" className="h2 d-block my-3 my-md-0">
            {logo}
          </Link>
        </div>
        <div className="col-sm-12 col-md-8">
          <div className="row mb-2">
            <div className="col-8 col-md-6">
              <SearchField handleNameChange={handleNameChange} name={name} />
            </div>
            <div className="col col-md-6">
              <ul className="nav justify-content-end">
                <li className="nav-item">
                  <a className="nav-link btn btn-primary disabled" href="/signup">Sign Up</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a className="nav-link active" href="/">All Records</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled" href="/my-favorites">My Favorites</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}