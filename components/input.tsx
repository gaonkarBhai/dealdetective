"use client"

import React from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { Link2 } from 'lucide-react';
import { SendHorizontal } from 'lucide-react';

export default function INPUT() {

    const [value, setValue] = React.useState("junior2nextui.org");
    const [buttonClicked, setButtonClicked] = React.useState(false);

    const amazonUrlRegex = /^https?:\/\/(www\.)?amazon\.(com|ca|co\.uk|de|fr|es|it|com\.au|com\.br|com\.mx|nl|sg|ae|in|jp|se|tr|com\.tr|com\.tw|cn|sa)\b/i;

    const validateEmail = (value:any) => value.match(amazonUrlRegex);

    const isInvalid = React.useMemo(() => {
        if (value === "" || (buttonClicked && !validateEmail(value))) {
            return true;
        }
        return false;
    }, [value, buttonClicked]);

    const handleButtonClick = () => {
        setButtonClicked(true);
        console.log(value)
    };

    return (
        <div className="flex w-96 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-items-center items-center align-center">
            <Input
                isClearable
                type="text"
                label="URL"
                placeholder="https://www.amazon.com/..."
                description="Enter a valid amazon url"
                labelPlacement="outside"
                isInvalid={isInvalid}
                color={isInvalid ? "danger" : "secondary"}
                errorMessage={isInvalid && "Please enter a valid URL"}
                onValueChange={setValue}
                startContent={
                    <Link2 />
                }
            />
            <Button color="primary" variant="flat" onClick={handleButtonClick}>
                <SendHorizontal />
            </Button>
        </div>
    );
}
