import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {Label} from "@/components/ui/label";
import {Slider} from "@/components/ui/slider";
import React from "react";

export default function MatchSettings(gameId, health, time, textLength, setHealth, setTime, setTextLength: {gameId: string, health: number, time: number, textLength: number, setHealth: function, setTime: function, setTextLength: function}) {
  return (
    <Card className={'my-3'}>
      <CardHeader>Match Settings:</CardHeader>
      <CardContent>
        <p>Invite Code: {gameId}</p>
        <Button className={'mt-1'} onClick={copyInvite}>Copy</Button>
        <div className={'my-8'}>
          <form>
            <div className={'grid-cols-4'}>
              <h2>Health:</h2>
              <ToggleGroup
                variant={'outline'}
                type={'single'}
                defaultValue={3}
                onValueChange={(value) => setHealth(value)}
              >
                <ToggleGroupItem value={-1}>Off</ToggleGroupItem>
                <ToggleGroupItem value={1}>1</ToggleGroupItem>
                <ToggleGroupItem value={2}>2</ToggleGroupItem>
                <ToggleGroupItem value={3}>3</ToggleGroupItem>
                <ToggleGroupItem value={4}>4</ToggleGroupItem>
                <ToggleGroupItem value={5}>5</ToggleGroupItem>
              </ToggleGroup>
              <h2>Time:</h2>
              <ToggleGroup
                type={'single'}
                variant={'outline'}
                defaultValue={60}
                onValueChange={(value) => setTime(value)}
              >
                <ToggleGroupItem value={-1}>Off</ToggleGroupItem>
                <ToggleGroupItem value={30}>30s</ToggleGroupItem>
                <ToggleGroupItem value={60}>60s</ToggleGroupItem>
                <ToggleGroupItem value={90}>90s</ToggleGroupItem>
                <ToggleGroupItem value={120}>120s</ToggleGroupItem>
              </ToggleGroup>
              <div className={'py-2'}>
                <h2>Text Length:</h2>
                <div className={'py-2'}>
                  <Label>{textLength} words</Label>
                  <Slider
                    className={'my-2'}
                    defaultValue={[100]}
                    max={200}
                    min={50}
                    step={1}
                    onValueChange={(value) => setTextLength(value[0])}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </CardContent>

    </Card>
  );

}