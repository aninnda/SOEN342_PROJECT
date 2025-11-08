<mxfile host="app.diagrams.net" agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36" version="28.2.9">
  <diagram name="Page-1" id="B4Gw8Fs9ErELHuyQzbEb">
    <mxGraphModel dx="2707" dy="1079" grid="1" gridSize="10" guides="0" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="850" pageHeight="1100" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        <mxCell id="LfAcExJkOWKTqjLHidqp-1" value="travelers" style="swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=30;fillColor=none;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;whiteSpace=wrap;html=1;" vertex="1" parent="1">
          <mxGeometry x="-320" y="690" width="330" height="150" as="geometry" />
        </mxCell>
        <mxCell id="LfAcExJkOWKTqjLHidqp-2" value="id&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; VARCHAR&amp;nbsp; &amp;nbsp; &amp;nbsp; Primary Key (traveler identifier)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" vertex="1" parent="LfAcExJkOWKTqjLHidqp-1">
          <mxGeometry y="30" width="330" height="26" as="geometry" />
        </mxCell>
        <mxCell id="LfAcExJkOWKTqjLHidqp-3" value="first_name&amp;nbsp; &amp;nbsp; &amp;nbsp; VARCHAR" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" vertex="1" parent="LfAcExJkOWKTqjLHidqp-1">
          <mxGeometry y="56" width="330" height="26" as="geometry" />
        </mxCell>
        <mxCell id="LfAcExJkOWKTqjLHidqp-4" value="last_name&amp;nbsp; &amp;nbsp; &amp;nbsp; VARCHAR" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" vertex="1" parent="LfAcExJkOWKTqjLHidqp-1">
          <mxGeometry y="82" width="330" height="32" as="geometry" />
        </mxCell>
        <mxCell id="LfAcExJkOWKTqjLHidqp-5" value="age&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;INT" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" vertex="1" parent="LfAcExJkOWKTqjLHidqp-1">
          <mxGeometry y="114" width="330" height="36" as="geometry" />
        </mxCell>
        <mxCell id="LfAcExJkOWKTqjLHidqp-6" value="trip_travelers" style="swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=none;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;whiteSpace=wrap;html=1;" vertex="1" parent="1">
          <mxGeometry x="40" y="720" width="310" height="78" as="geometry" />
        </mxCell>
        <mxCell id="LfAcExJkOWKTqjLHidqp-7" value="trip_id&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;BIGINT&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;Foreign Key --&amp;gt; trips(id)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" vertex="1" parent="LfAcExJkOWKTqjLHidqp-6">
          <mxGeometry y="26" width="310" height="26" as="geometry" />
        </mxCell>
        <mxCell id="LfAcExJkOWKTqjLHidqp-8" value="traveler_id&amp;nbsp; &amp;nbsp; VARCHAR&amp;nbsp; &amp;nbsp; Foreigh Key --&amp;gt; travelers(id)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" vertex="1" parent="LfAcExJkOWKTqjLHidqp-6">
          <mxGeometry y="52" width="310" height="26" as="geometry" />
        </mxCell>
        <mxCell id="LfAcExJkOWKTqjLHidqp-11" value="trips" style="swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=none;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;whiteSpace=wrap;html=1;" vertex="1" parent="1">
          <mxGeometry x="370" y="720" width="300" height="78" as="geometry" />
        </mxCell>
        <mxCell id="LfAcExJkOWKTqjLHidqp-12" value="id&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;BIGINT&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; Primary Key" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" vertex="1" parent="LfAcExJkOWKTqjLHidqp-11">
          <mxGeometry y="26" width="300" height="26" as="geometry" />
        </mxCell>
        <mxCell id="LfAcExJkOWKTqjLHidqp-13" value="initial_departure_date&amp;nbsp; &amp;nbsp; &amp;nbsp;TIMESTAMP&amp;nbsp;&amp;nbsp;" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" vertex="1" parent="LfAcExJkOWKTqjLHidqp-11">
          <mxGeometry y="52" width="300" height="26" as="geometry" />
        </mxCell>
        <mxCell id="LfAcExJkOWKTqjLHidqp-16" value="trip_route_ids" style="swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=none;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;whiteSpace=wrap;html=1;" vertex="1" parent="1">
          <mxGeometry x="370" y="880" width="300" height="78" as="geometry" />
        </mxCell>
        <mxCell id="LfAcExJkOWKTqjLHidqp-17" value="trip_id&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;BIGINT&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;Foreign Key --&amp;gt; trips(id)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" vertex="1" parent="LfAcExJkOWKTqjLHidqp-16">
          <mxGeometry y="26" width="300" height="26" as="geometry" />
        </mxCell>
        <mxCell id="LfAcExJkOWKTqjLHidqp-18" value="route_id&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; VARCHAR" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" vertex="1" parent="LfAcExJkOWKTqjLHidqp-16">
          <mxGeometry y="52" width="300" height="26" as="geometry" />
        </mxCell>
        <mxCell id="LfAcExJkOWKTqjLHidqp-21" value="ticket" style="swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=none;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;whiteSpace=wrap;html=1;" vertex="1" parent="1">
          <mxGeometry x="730" y="700" width="370" height="140" as="geometry" />
        </mxCell>
        <mxCell id="LfAcExJkOWKTqjLHidqp-22" value="id&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;BIGINT&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; Primary Key" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" vertex="1" parent="LfAcExJkOWKTqjLHidqp-21">
          <mxGeometry y="26" width="370" height="26" as="geometry" />
        </mxCell>
        <mxCell id="LfAcExJkOWKTqjLHidqp-23" value="traveler_id&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;VARCHAR&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;Foreign Key --&amp;gt; travelers(id)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" vertex="1" parent="LfAcExJkOWKTqjLHidqp-21">
          <mxGeometry y="52" width="370" height="26" as="geometry" />
        </mxCell>
        <mxCell id="LfAcExJkOWKTqjLHidqp-24" value="&lt;div&gt;trip_id&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; BIGINT&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; Foreign Key --&amp;gt; trips(id)&lt;/div&gt;" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" vertex="1" parent="LfAcExJkOWKTqjLHidqp-21">
          <mxGeometry y="78" width="370" height="32" as="geometry" />
        </mxCell>
        <mxCell id="LfAcExJkOWKTqjLHidqp-25" value="issued_at&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; TIMESTAMP&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" vertex="1" parent="LfAcExJkOWKTqjLHidqp-21">
          <mxGeometry y="110" width="370" height="30" as="geometry" />
        </mxCell>
        <mxCell id="LfAcExJkOWKTqjLHidqp-42" value="" style="endArrow=none;html=1;rounded=0;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="1" source="LfAcExJkOWKTqjLHidqp-3" target="LfAcExJkOWKTqjLHidqp-7">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="320" y="790" as="sourcePoint" />
            <mxPoint x="370" y="740" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="LfAcExJkOWKTqjLHidqp-43" value="" style="endArrow=none;html=1;rounded=0;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="1" source="LfAcExJkOWKTqjLHidqp-7" target="LfAcExJkOWKTqjLHidqp-12">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="390" y="800" as="sourcePoint" />
            <mxPoint x="440" y="750" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="LfAcExJkOWKTqjLHidqp-44" value="" style="endArrow=none;html=1;rounded=0;exitX=0.5;exitY=0;exitDx=0;exitDy=0;entryX=0.5;entryY=1;entryDx=0;entryDy=0;" edge="1" parent="1" source="LfAcExJkOWKTqjLHidqp-16" target="LfAcExJkOWKTqjLHidqp-11">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="550" y="800" as="sourcePoint" />
            <mxPoint x="600" y="750" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="LfAcExJkOWKTqjLHidqp-46" value="" style="endArrow=none;html=1;rounded=0;exitX=1.01;exitY=0.453;exitDx=0;exitDy=0;exitPerimeter=0;entryX=0.001;entryY=0.222;entryDx=0;entryDy=0;entryPerimeter=0;" edge="1" parent="1" source="LfAcExJkOWKTqjLHidqp-12" target="LfAcExJkOWKTqjLHidqp-23">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="580" y="790" as="sourcePoint" />
            <mxPoint x="630" y="740" as="targetPoint" />
          </mxGeometry>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
