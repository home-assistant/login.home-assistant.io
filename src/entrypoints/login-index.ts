import { LitElement, PropertyValues, css, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { extractSearchParam } from "../util/search-params";
import { validUrl } from "../util/validate";

@customElement("login-index")
class LoginIndex extends LitElement {
  @state() private _error?: string;

  createRenderRoot() {
    return this;
  }

  protected updated(changedProperties: PropertyValues) {
    if (changedProperties.has("_error") && this._error) {
      this.renderRoot.querySelector("#loading")?.remove();
    }
  }

  public connectedCallback() {
    super.connectedCallback();

    const url = extractSearchParam("u");

    if (!url) {
      this._error = "Invalid URL.";
      return;
    }

    if (!validUrl(url)) {
      this._error = "Invalid URL.";
      return;
    }

    // redirect to the URL
    window.location.replace(url);
  }

  protected render() {
    if (this._error) {
      return html`<div class="error" role="alert">
        <div class="error-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>
        </div>
        <div class="error-content">${this._error}</div>
      </div>`;
    }
    return nothing;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "login-index": LoginIndex;
  }
}
