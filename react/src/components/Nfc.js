import React, { useEffect } from "react";
import WindowObjects from './WindowObjects';

const Nfc = (props) => {
    /**
     * Initialize NFC functionality and set up event listeners for scanning NFC tags.
     *
     * @param {object} props - The properties passed to the NFC component
     * @return {JSX.Element} The JSX element representing the NFC component
     */
    useEffect(() => {
        // Function to log messages to the console
        const log = (...args) => {
            const line = args
                .map((argument) =>
                    typeof argument === "string" ? argument : JSON.stringify(argument)
                )
                .join(" ");

            document.querySelector("#log").textContent += line + "\n";
        };

        // Function to set the status text
        const setStatus = (status) => {
            document.querySelector("#status").textContent = status;
        };

        // Function to set the content of the NFC tag
        const setContent = (newContent) => {
            const content = document.querySelector("#content");
            while (content.hasChildNodes()) {
                content.removeChild(content.lastChild);
            }
            content.appendChild(newContent);
        };

        const scanButton = document.querySelector("#scanButton");

        // Check if NFC reading is supported in the browser
        if (!("NDEFReader" in window))
            setStatus(
                "NFC lasīšana šajā pārlūkprogrammā nav iespējama. \
        Lietojiet Chrome caur Android telefonu.\
        Diemžēl iPhone neatbalsta NFC izmantošanu pārlūkprogrammā."
            );

        // Add event listener to the scan button
        scanButton.addEventListener("click", async () => {
            //   log("User clicked scan button");

            try {
                const ndef = new NDEFReader();
                await ndef.scan();
                // log("> Scan started");

                // Event listener for reading errors
                ndef.addEventListener("readingerror", () => {
                    log("Neizdevās nolasīt NFC karti!");
                });

                // Event listener for successful reading
                ndef.addEventListener("reading", ({ message, serialNumber }) => {
                    // log(`> Serial Number: ${serialNumber}`);
                    var serialNumber = (serialNumber.toUpperCase()).toString();
                    props.changeSerializer({ serialNumber });
                });
            } catch (error) {
                // Clear previous log
                document.querySelector("#log").textContent = "";
                log("Argh! " + error);
            }
        });
    }, []);

    return (
        <div className="output">
            <div id="content"></div>
            <div id="status"></div>
            <pre id="log"></pre>
            {/* {("NDEFReader" in window) ? null : (
        <div>
          <h1>Available Window Objects:</h1>
          <WindowObjects />
        </div>
      )} */}
            <button className="w-50 btn btn-med btn-primary" id="scanButton">
                Skenēt
            </button>
        </div>
    );
};

export default Nfc;
