import { useCallback } from "react";
import { useLocale } from "../hooks";

export const locales = [
  {
    value: "en",
    label: "English",
  },
  {
    value: "de",
    label: "Deutsch",
  },
  {
    value: "fr",
    label: "Français",
  },
  {
    value: "pt",
    label: "Português",
  },
  {
    value: "es",
    label: "Española",
  },
];

const strings = {
  language: {
    en: "Language",
    de: "Sprache",
    fr: "Langue",
    pt: "Linguagem",
    es: "Idioma",
    it: "Lingua",
  },
  choose_product: {
    en: "Choose Product",
    de: "Produkt auswählen",
    fr: "Choisir le produit",
    pt: "Escolher Produto",
    es: "Elija el producto",
    it: "Scegliere il prodotto",
  },
  instructions: {
    en: "Instructions",
    de: "Anleitung",
    fr: "Instructions",
    pt: "Instruções",
    es: "Instrucciones",
    it: "Istruzioni",
  },
  instructions_steps_title: {
    en: "Follow these steps to use the app",
    de: "Folgen Sie diesen Schritten, um die App zu verwenden",
    fr: "Suivez les étapes suivantes pour utiliser l'application",
    pt: "Siga estes passos para utilizar a aplicação",
    es: "Siga estos pasos para utilizar la aplicación",
    it: "Segui questi passi per usare l'applicazione",
  },
  select_product_msg: {
    en: "Select products to change their canonical-tag.",
    de: "Wählen Sie Produkte aus, deren canonical-tag Sie ändern möchten.",
    fr:
      "Sélectionnez les produits dont vous souhaitez modifier la canonical-tag.",
    pt: "Seleccionar produtos para alterar a sua canonical-tag.",
    es: "Seleccione los productos para cambiar su canonical-tag.",
    it: "Seleziona i prodotti per cambiare il loro canonical-tag.",
  },
  instructions_step_1: {
    en: "Choose a product you want to add a canonical-tag for.",
    de:
      "Wählen Sie ein Produkt, für das Sie einen canonical-tag hinzufügen möchten.",
    fr:
      "Choisissez un produit pour lequel vous souhaitez ajouter une canonical-tag.",
    pt: "Escolha um produto para o qual deseja adicionar uma canonical-tag.",
    es: "Elija un producto al que desee añadir una canonical-tag.",
    it: "Scegli un prodotto per il quale vuoi aggiungere un canonical-tag.",
  },
  instructions_step_2: {
    en: "Add the URL for the product in the field and save.",
    de: "Fügen Sie die URL für das Produkt in das Feld ein und speichern Sie.",
    fr: "Ajoutez l'URL du produit dans le champ et enregistrez.",
    pt: "Adicione o URL para o produto no campo e guarde.",
    es: "Añade la URL del producto en el campo y guarda.",
    it: "Aggiungi l'URL del prodotto nel campo e salva.",
  },
  instructions_step_3: {
    en:
      "You can check your product page to have an updated canonical-tag (You can use online canonical URL checkers).",
    de:
      "Sie können überprüfen, ob Ihre Produktseite über einen aktualisierten canonical-tag verfügt (Sie können Online-Prüfprogramme für canonical URLs verwenden).",
    fr:
      "Vous pouvez vérifier que la page de votre produit possède une canonical-tag mise à jour (vous pouvez utiliser des vérificateurs d'URL canoniques en ligne).",
    pt:
      "Pode verificar a sua página de produto para ter uma canonical-tag actualizada (Pode usar verificadores de URL canónicos online).",
    es:
      "Puedes comprobar que la página de tu producto tiene una canonical-tag actualizada (puedes utilizar los comprobadores de URL canónicas online).",
    it:
      "Puoi controllare che la pagina del tuo prodotto abbia un canonical-tag aggiornato (puoi usare i checker online di URL canonici).",
  },
  restore_assurance: {
    en: "This can always be set back to the original product URL",
    de:
      "Diese kann jederzeit auf die ursprüngliche Produkt-URL zurückgesetzt werden",
    fr: "Vous pouvez toujours revenir à l'URL originale du produit.",
    pt: "Isto pode sempre ser reposto ao URL original do produto",
    es:
      "Esto siempre se puede establecer de nuevo a la URL original del producto",
    it: "Questo può sempre essere riportato all'URL originale del prodotto",
  },
  update: {
    en: "Update",
    de: "Aktualisieren",
    fr: "Mettre à jour",
    pt: "Actualização",
    es: "Actualizar",
    it: "Aggiorna",
  },
  success_msg: {
    en:
      "Updated! Inspect it on https://www.seoreviewtools.com/canonical-url-location-checker. Should reflect within a min. How about you enjoy a glass of water ;)",
    de:
      "Aktualisiert! Prüfen Sie dies auf https://www.seoreviewtools.com/canonical-url-location-checker. Es sollte innerhalb einer Minute angezeigt werden. Wie wäre es, wenn Sie ein Glas Wasser genießen ;)",
    fr:
      "Mise à jour ! Contrôlez-la sur https://www.seoreviewtools.com/canonical-url-location-checker. Cela devrait se refléter dans une minute. Et si vous savouriez un verre d'eau ;)",
    pt:
      "Actualizado! Inspeccione-a em https://www.seoreviewtools.com/canonical-url-location-checker. Deve reflectir dentro de um minuto. Que tal desfrutar de um copo de água ;)",
    es:
      "¡Actualizar! Compruébelo en https://www.seoreviewtools.com/canonical-url-location-checker. Debería reflejarse en un minuto. Que tal si disfrutas de un vaso de agua ;)",
    it:
      "Aggiornato! Controlla su https://www.seoreviewtools.com/canonical-url-location-checker. Dovrebbe riflettere entro un minuto. Che ne dici di goderti un bicchiere d'acqua ;)",
  },
  update_theme: {
    en: "Update Theme",
    de: "Thema aktualisieren",
    fr: "Thème de mise à jour",
    pt: "Tema de Actualização",
    es: "Actualizar Tema",
    it: "Aggiorna Tema",
  },
  installation_title: {
    en: "Installation Step",
    de: "Schritt der Installation",
    fr: "Étape d'installation",
    pt: "Etapa de instalação",
    es: "Paso de instalación",
    it: "Fase di installazione",
  },
  installation_missing_msg: {
    en:
      "Looks like your theme isn't updated yet! If you did follow below link and saved already, then just refresh.",
    de:
      "Sieht so aus, als wäre Ihr Theme noch nicht aktualisiert! Wenn Sie dem unten stehenden Link gefolgt sind und bereits gespeichert haben, dann aktualisieren Sie einfach.",
    fr:
      "Il semble que votre thème n'est pas encore mis à jour ! Si vous avez suivi le lien ci-dessous et que vous avez déjà enregistré, il vous suffit de rafraîchir.",
    pt:
      "Parece que o seu tema ainda não está actualizado! Se seguiu o link abaixo e já o guardou, então é só actualizar.",
    es:
      "Parece que su tema no se ha actualizado todavía. Si has seguido el siguiente enlace y lo has guardado, entonces sólo tienes que actualizarlo.",
    it:
      "Sembra che il tuo tema non sia ancora aggiornato! Se hai seguito il link qui sotto e salvato già, allora basta aggiornare.",
  },
  installation_direction: {
    en:
      "To include canonical-tag, Shopify theme need to enable this extension. Update Theme link will take you to your themes settings where you can click on Save on top right.",
    de:
      "Um den canonical-tag einzubinden, muss das Shopify-Theme diese Erweiterung aktivieren. Der Link Theme aktualisieren bringt Sie zu den Einstellungen Ihres Themes, wo Sie oben rechts auf Speichern klicken können.",
    fr:
      "Pour inclure la canonical-tag, le thème Shopify doit activer cette extension. Le lien Update Theme (mise à jour du thème) vous conduira aux paramètres de votre thème où vous pourrez cliquer sur Save en haut à droite. à droite.",
    pt:
      "Para incluir a tag canónica, o tema Shopify precisa de activar esta extensão. A ligação Update Theme irá levá-lo às definições dos seus temas, onde pode clicar em Save on top certo.",
    es:
      "Para incluir la canonical-tag, el tema de Shopify necesita habilitar esta extensión. El enlace de actualización del tema le llevará a la configuración de sus temas donde puede hacer clic en Guardar en la parte superior derecha.",
    it:
      "Per includere il tag canonical, il tema Shopify deve abilitare questa estensione. Aggiornare il link del tema vi porterà alle impostazioni dei temi dove è possibile fare clic su Salva in alto a destra.",
  },
};

export function useTranslations() {
  const { locale } = useLocale();
  return useCallback((key) => strings[key][locale], [locale]);
}

export default strings;
