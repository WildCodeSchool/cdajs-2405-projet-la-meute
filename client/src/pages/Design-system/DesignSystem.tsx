export default function DesignSystem() {
    return (
        <div className="page-ds-layout">
            <div className="ds-layout container">
                <div className="ds-layout__column">
                    <div>
                        <h1>Heading 01</h1>
                        <p>Sert à donner un nom à la page. Il y a un seul texte dans ce style par page.</p>
                    </div>
                    <div>
                        <h2>Heading 01</h2>
                        <p>Sert à donner des titres d’étagère de la page.</p>
                    </div>
                    <div>
                        <h3>Heading 03</h3>
                        <p>Sert pour les sous-titres.</p>
                    </div>
                    <div>
                        <h4>Heading 04</h4>
                        <p>Sert pour donner des titres à des paragraphes.</p>
                    </div>
                    <div>
                        <h5>Heading 05</h5>
                        <p>Sert pour les titres du formulaire.</p>
                    </div>
                </div>
                <div className="ds-layout__column">
                    <div>
                        <p className="quote1">Quote 01</p>
                        <p>Sert à mettre en valeur les thème de salon ou des accroches</p>
                    </div>
                    {/*                     <div>
                        <p>Display 02</p>
                        <p>Sert à mettre en valeur des citations.</p>
                    </div>
                </div>
                <div className="ds-layout__column">
                    <Body1>
                        Body 01 - Exemple de paragraphe pour les styles Body, afin de mettre dans le contexte avec lignes.
                    </Body1>
                    <Body2>
                        Body 02 - Exemple de paragraphe pour les styles Body, afin de mettre dans le contexte avec lignes.
                    </Body2>
                    <Body3>
                        Body 03 - Exemple de paragraphe pour les styles Body, afin de mettre dans le contexte avec lignes.
                    </Body3>
                </div>
                <div className="ds-layout__column">
                    <Caption>Caption — Détails</Caption>
                </div>
                <div className="ds-layout__column center">
                    <p className="h1">
                        Nos livres <span className="font-display text-primary">littérature et fictions</span>
                    </p>
                    <p className="h1">
                        Nos livres <br />
                        <span className="font-display text-primary">littérature et fictions</span>
                    </p>
                    <p className="h1 text-primary">
                        <span className="font-display text-default">Nos livres </span>
                        <br />
                        littérature et fictions
                    </p>
                    <p className="h1">
                        Meilleurs ventes <span className="font-display text-primary">littératures et fictions</span>
                    </p>
                </div>
                <div className="ds-layout__column">
                    <div className="ds-layout__column__buttons-grid">
                        <div className="ds-layout__column__buttons-grid__list">
                            <PrimaryButton color="red">Button</PrimaryButton>
                            <PrimaryButton color="red" icon="left">
                                <Icon icon="Icon" title="" /> Button
                            </PrimaryButton>
                            <PrimaryButton color="red" icon="right">
                                Button <Icon icon="Icon" title="" />
                            </PrimaryButton>
                            <PrimaryButton color="red" icon="only">
                                <Icon icon="Icon" title="" />
                            </PrimaryButton>
                        </div>
                        <div className="ds-layout__column__buttons-grid__list">
                            <OutlineButton color="red">Outlined</OutlineButton>
                            <OutlineButton color="red" icon="left">
                                <Icon icon="Icon" title="" /> Outlined
                            </OutlineButton>
                            <OutlineButton color="red" icon="right">
                                Outlined <Icon icon="Icon" title="" />
                            </OutlineButton>
                            <OutlineButton color="red" icon="only">
                                <Icon icon="Icon" title="" />
                            </OutlineButton>
                        </div>
                        <div className="ds-layout__column__buttons-grid__list">
                            <PrimaryButton color="green">Button</PrimaryButton>
                            <PrimaryButton color="green" icon="left">
                                <Icon icon="Icon" title="" /> Button
                            </PrimaryButton>
                            <PrimaryButton color="green" icon="right">
                                Button <Icon icon="Icon" title="" />
                            </PrimaryButton>
                            <PrimaryButton color="green" icon="only">
                                <Icon icon="Icon" title="" />
                            </PrimaryButton>
                        </div>
                        <div className="ds-layout__column__buttons-grid__list">
                            <OutlineButton href="http://google.com" color="green">
                                Outlined
                            </OutlineButton>
                            <OutlineButton href="http://google.com" color="green" icon="left">
                                <Icon icon="Icon" title="" /> Outlined
                            </OutlineButton>
                            <OutlineButton color="green" icon="right">
                                Outlined <Icon icon="Icon" title="" />
                            </OutlineButton>
                            <OutlineButton color="green" icon="only">
                                <Icon icon="Icon" title="" />
                            </OutlineButton>
                        </div>
                        <div className="ds-layout__column__buttons-grid__list">
                            <LinkButton href="/">
                                <span>Button</span>
                            </LinkButton>
                            <LinkButton href="http://google.com">
                                <Icon icon="Icon" title="" /> <span>Button</span>
                            </LinkButton>
                            <LinkButton href="http://google.com">
                                <span>Button</span> <Icon icon="Icon" title="" />
                            </LinkButton>
                            <LinkButton href="http://google.com">
                                <Icon icon="Icon" title="" />
                            </LinkButton>
                        </div>
                        <div className="ds-layout__column__buttons-grid__list">
                            <LinkButton color="red" href="/">
                                <span>Button</span>
                            </LinkButton>
                            <LinkButton color="red" href="http://google.com">
                                <Icon icon="Icon" title="" /> <span>Button</span>
                            </LinkButton>
                            <LinkButton color="red" href="http://google.com">
                                <span>Button</span> <Icon icon="Icon" title="" />
                            </LinkButton>
                            <LinkButton color="red" href="http://google.com">
                                <Icon icon="Icon" title="" />
                            </LinkButton>
                        </div>
                        <div className="ds-layout__column__buttons-grid__list">
                            <LinkButton color="green" href="/">
                                <span>Button</span>
                            </LinkButton>
                            <LinkButton color="green" href="http://google.com">
                                <Icon icon="Icon" title="" /> <span>Button</span>
                            </LinkButton>
                            <LinkButton color="green" href="http://google.com">
                                <span>Button</span> <Icon icon="Icon" title="" />
                            </LinkButton>
                            <LinkButton color="green" href="http://google.com">
                                <Icon icon="Icon" title="" />
                            </LinkButton>
                        </div>
                        <div className="ds-layout__column__buttons-grid__list">
                            <ExtraButton color="green" href="/">
                                <span>Button</span>
                            </ExtraButton>
                            <ExtraButton color="green" href="http://google.com">
                                <Icon icon="Icon" title="" /> <span>Button</span>
                            </ExtraButton>
                        </div>
                        <div className="ds-layout__column__buttons-grid__list">
                            <RoundedButton icon="HeartVibes" href="http://google.com">
                                <span>Écouter un avis audio</span>
                            </RoundedButton>
                            <RoundedButton icon="HeartVibes" color="red" href="http://google.com">
                                <span>Écouter un avis audio</span>
                            </RoundedButton>
                            <RoundedButton icon="HeartVibes" color="green" href="http://google.com">
                                <span>Écouter un avis audio</span>
                            </RoundedButton>
                        </div>
                        <div className="ds-layout__column__buttons-grid__list">
                            <Tag>Science fiction</Tag>
                            <Tag color="default-darker">Science fiction</Tag>
                            <Tag color="red">Science fiction</Tag>
                            <Tag color="green">Science fiction</Tag>
                            <Tag color="yellow">Science fiction</Tag>
                        </div>
                    </div>
                            */}
                </div>
                <div className="ds-layout__column">
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
