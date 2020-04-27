import React, {useRef, useState, useEffect} from 'react';

export const AnimateRange = React.memo(({count, animationTime, children, replay}) => {
    const [r, setReplay] = useState(-1);
    const [frame, setFrame] = useState(0);
    const frameRef = useRef(frame);
    frameRef.current = frame;// Can't ref frame in useEffect closure
    if (r !== replay) {
        setReplay(replay);
        setFrame(0);
        frameRef.current = 0;
    }


    useEffect(() => {
        let timer = setInterval(() => {
            if (frameRef.current < count - 1)
                setFrame(frameRef.current + 1);
        }, animationTime * 1000 / count);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {children instanceof Array &&
                children.map( children =>
                    React.cloneElement(children, { frame: frameRef.current})
                )
            }
            {!children instanceof Array &&
                React.cloneElement(children, { frame: frameRef.current})
            }
        </>
    );
});
