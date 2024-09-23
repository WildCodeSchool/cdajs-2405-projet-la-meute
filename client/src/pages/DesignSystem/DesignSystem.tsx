export default function DesignSystem() {
    return (
        <div className="page-ds-layout">
            <div className="">
                <div className="debug">
                    <h1 className="h1">Heading 01</h1>
                    <p>Sert à donner un nom à la page. Il y a un seul texte dans ce style par page.</p>
                    <h2>Heading 02</h2>
                    <p>Sert à donner des titres d’étagère de la page.</p>
                    <h3>Heading 03</h3>
                    <p>Sert pour les sous-titres.</p>
                    <h4>Heading 04</h4>
                    <p>Sert pour donner des titres à des paragraphes.</p>
                    <h5>Heading 05</h5>
                    <p>Sert pour les titres du formulaire.</p>
                </div>
                <div className="debug">
                    <blockquote className="quote1">Quote 01</blockquote>
                    <p>Sert à mettre en valeur les thèmes de salon ou des accroches</p>
                    <blockquote className="quote2">Display 02</blockquote>
                    <p>Sert à mettre en valeur des citations.</p>
                </div>
                <div className="debug">
                    <p className="body1">
                        Body 01 - Exemple de paragraphe pour les styles Body, afin de mettre dans le contexte avec lignes.
                    </p>
                    <p className="body2">
                        Body 02 - Exemple de paragraphe pour les styles Body, afin de mettre dans le contexte avec lignes.
                    </p>
                    <p className="body3">
                        Body 03 - Exemple de paragraphe pour les styles Body, afin de mettre dans le contexte avec lignes.
                    </p>
                </div>
                <div className="debug">
                    <figure>
                        <img src="https://placehold.co/600x400" alt="empty placeholder"/>
                        <figcaption>Caption — Détails</figcaption>
                    </figure>
                </div>
                <div className="center">
                    <p className="h1">
                        Nos livres <span>littérature et fictions</span>
                    </p>
                    <p className="h1">
                        Nos livres <br />
                        <span>littérature et fictions</span>
                    </p>
                    <p className="h1 text-primary">
                        <span>Nos livres </span>
                        <br />
                        littérature et fictions
                    </p>
                    <p className="h1">
                        Meilleurs ventes <span>littératures et fictions</span>
                    </p>
                </div>
                <div className="">
                    <div className="">
                        <div className="">
                            <button>Button</button>
                            <button >
                                Button
                            </button>
                            <button >
                                Button
                            </button>
                            <button >

                            </button>
                        </div>
                        <div className="">
                            <button>Outlined</button>
                            <button >
                                Outlined
                            </button>
                            <button >
                                Outlined
                            </button>
                            <button >

                            </button>
                        </div>
                        <div className="">
                            <button>Button</button>
                            <button >
                                Button
                            </button>
                            <button >
                                Button
                            </button>
                            <button >

                            </button>
                        </div>
                        <div className="">
                            <button>
                                Outlined
                            </button>
                            <button >
                                Outlined
                            </button>
                            <button >
                                Outlined
                            </button>
                            <button >

                            </button>
                        </div>
                        <div className="">
                            <button>
                                <span>Button</span>
                            </button>
                            <button>
                                <span>Button</span>
                            </button>
                            <button>
                                <span>Button</span>
                            </button>
                            <button>

                            </button>
                        </div>
                        <div className="">
                            <button>
                                <span>Button</span>
                            </button>
                            <button>
                                <span>Button</span>
                            </button>
                            <button>
                                <span>Button</span>
                            </button>
                            <button>

                            </button>
                        </div>
                        <div className="">
                            <button>
                                <span>Button</span>
                            </button>
                            <button>
                                <span>Button</span>
                            </button>
                            <button>
                                <span>Button</span>
                            </button>
                            <button>

                            </button>
                        </div>
                        <div className="">
                            <button>
                                <span>Button</span>
                            </button>
                            <button>
                                <span>Button</span>
                            </button>
                        </div>
                        <div className="">
                            <button>
                                <span>Écouter un avis audio</span>
                            </button>
                            <button>
                                <span>Écouter un avis audio</span>
                            </button>
                            <button>
                                <span>Écouter un avis audio</span>
                            </button>
                        </div>
                        <div className="">
                            <span>Science fiction</span>
                            <span>Science fiction</span>
                            <span>Science fiction</span>
                            <span>Science fiction</span>
                            <span>Science fiction</span>
                        </div>
                    </div>
                </div>
                <div className="">
                    <input type="checkbox" />
                    <input type="checkbox" disabled={true} />
                    <input type="radio" name="radio" value={1} />
                    <input type="radio" name="radio" value={2} />
                    <input type="radio" name="radio" value={3} disabled={true} />
                </div>
            </div>
        </div>
    );
}
