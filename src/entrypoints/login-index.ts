import { LitElement, TemplateResult, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { extractSearchParam } from "../util/search-params";
import { validUrl } from "../util/validate";

@customElement("login-index")
class LoginIndex extends LitElement {
  @state() private _error?: string;

  createRenderRoot() {
    while (this.lastChild) {
      this.removeChild(this.lastChild);
    }
    return this;
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

  protected render(): TemplateResult {
    if (this._error) {
      return html`<div class="error">${this._error}</div>`;
    }
    return html` Loading... `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "login-index": LoginIndex;
  }
}
